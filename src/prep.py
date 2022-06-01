import os
from json import load, dumps, dump
import re
import subprocess

packs = ["player-macros", "gm-macros"]


def id_from_js_file_content(content: str, name: str):
    ids = re.findall("// _id:(.*)\n", content)
    if len(ids) != 1:
        raise Exception(f"Bad Script {name}")
    return ids[0]


def name_from_js_file_content(content: str, name: str):
    ids = re.findall("// name:(.*)\n", content)
    if len(ids) != 1:
        raise Exception(f"Bad Script {name}")
    return ids[0]


def none_or_key_from_js_file_content(content: str, key: str):
    finds = re.findall(f"// {key}:(.*)\n", content)
    if len(finds) < 1:
        return None
    return finds[0]


def is_git_clean_working_tree():
    result = subprocess.check_output(["git", "status", "--porcelain", "--untracked-files=no"]).decode()
    return result is None or result == ""


def next_minor_increment():
    gitoutput = subprocess.check_output(["git", "tag", "--sort=committerdate"]).decode()
    gitoutput = gitoutput.strip()
    lastline = gitoutput.split("\n")[gitoutput.count("\n")]
    lastline_split = lastline.split(".")
    lastline_split[-1] = str(int(lastline_split[-1]) + 1)
    return ".".join(lastline_split)


def macro_from_path(js_file_path, pack, src):
    macro = load(open(f"{src}/{pack}/default.json"))
    js_file_content = open(js_file_path).read()
    macro["command"] = js_file_content
    macro["_id"] = id_from_js_file_content(js_file_content, js_file_path)
    macro["name"] = name_from_js_file_content(js_file_content, js_file_path)
    img = none_or_key_from_js_file_content(js_file_content, "img")
    if img is not None:
        macro["img"] = img
    return macro


def base_module_object(github_project, module_version, src):
    module = load(open(f"{src}/stubs/module-stub.json"))
    module["url"] = f"https://github.com/{github_project}"
    module["manifest"] = f"https://raw.githubusercontent.com/{github_project}/master/module.json"
    module["bugs"] = f"https://github.com/{github_project}/issues"
    module["readme"] = f"https://raw.githubusercontent.com/{github_project}/master/README.md"
    module["changelog"] = f"https://github.com/{github_project}/releases"
    module["license"] = f"https://raw.githubusercontent.com/{github_project}/master/LICENSE.md"
    module["download"] = f"https://github.com/{github_project}/archive/refs/tags/{module_version}.zip"
    module["version"] = module_version
    return module


def main():
    src = "src"
    github_project = "Muhsigbokz/muhsigbokz_ptu_resources"
    module_version = next_minor_increment()

    if not is_git_clean_working_tree():
        print("Not clean working tree")
        exit(1)

    module = base_module_object(github_project, module_version, src)
    pack_objects = []
    packs_md_stub_string = ""
    for pack in packs:
        pack_object = load(open(f"{src}/{pack}/pack.json"))
        pack_objects.append(pack_object)
        packs_md_stub_string += f"## {pack_object['label']}\n\nIn `{src}/{pack}`\n\n"
        entities_strings = []
        js_file_names = [file for file in os.listdir(f"{src}/{pack}") if file.endswith(".js")]
        for js_file_name in js_file_names:
            js_file_path = f"{src}/{pack}/{js_file_name}"
            macro = macro_from_path(js_file_path, pack, src)
            entities_strings.append(dumps(macro))
            with open(js_file_path.replace(".js", ".md"), "r") as md_file:
                packs_md_stub_string += md_file.read() + "\n\n"
        with open(pack_object["path"], "w") as db_file:
            db_file.write("\n".join(entities_strings))
        subprocess.check_call(["git", "add", f"{pack_object['path']}"])


    module["packs"] = pack_objects
    dump(module, open("module.json", "w"), indent=4)
    subprocess.check_call(["git", "add", "module.json"])

    readme_string = open(f"{src}/stubs/README-stub.md").read()
    readme_string = readme_string.replace("//PACKS//", packs_md_stub_string)
    with open("README.md", "w") as readme_file:
        readme_file.write(readme_string)
    subprocess.check_call(["git", "add", "README.md"])

    subprocess.check_call(["git", "commit", "-am", f"'Auto commit for {module_version}'"])
    subprocess.check_call(["git", "tag", f"{module_version}"])



if __name__ == '__main__':
    main()  # x
