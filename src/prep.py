import os
from json import load, dumps, dump
import re
import subprocess
packs = ["ptu-macros"]


def id_from_js_file_content(content: str):
    ids = re.findall("// _id:(.*)\n", content)
    if len(ids) != 1:
        raise Exception("Bad Script")
    return ids[0]


def name_from_js_file_content(content: str):
    ids = re.findall("// name:(.*)\n", content)
    if len(ids) != 1:
        raise Exception("Bad Script")
    return ids[0]


def is_git_clean_working_tree():
    result = subprocess.check_output(["git", "status", "--porcelain", "--untracked-files=no"]).decode()
    return result is None or result == ""



def main():
    src = "src"
    github_project = "Muhsigbokz/muhsigbokz_ptu_resources"
    module_version = "v0.0.4"
    
    if not is_git_clean_working_tree():
        print("Not clean working tree")
        exit(1)
    
    module = base_module_object(github_project, module_version, src)
    pack_objects = []
    for pack in packs:
        pack_object = load(open(f"{src}/{pack}/pack.json"))
        pack_objects.append(pack_object)
        entities_strings = []
        js_file_names = [file for file in os.listdir(f"{src}/{pack}") if file.endswith(".js")]
        for js_file_name in js_file_names:
            macro = macro_from_path(js_file_name, pack, src)
            entities_strings.append(dumps(macro))
        with open(pack_object["path"], "w") as db_file:
            db_file.write("\n".join(entities_strings))
            
            
    module["packs"] = pack_objects
    dump(module, open("module.json", "w"), indent=4)



def macro_from_path(js_file_name, pack, src):
    js_file_path = f"{src}/{pack}/{js_file_name}"
    macro = load(open(f"{src}/{pack}/default.json"))
    js_file_content = open(js_file_path).read()
    macro["command"] = js_file_content
    macro["_id"] = id_from_js_file_content(js_file_content)
    macro["name"] = name_from_js_file_content(js_file_content)
    return macro


def base_module_object(github_project, module_version, src):
    module = load(open(f"{src}/module.json"))
    module["url"] = f"https://github.com/{github_project}"
    module["manifest"] = f"https://raw.githubusercontent.com/{github_project}/master/module.json"
    module["bugs"] = f"https://github.com/{github_project}/issues"
    module["readme"] = f"https://raw.githubusercontent.com/{github_project}/master/README.md"
    module["changelog"] = f"https://github.com/{github_project}/releases"
    module["license"] = f"https://raw.githubusercontent.com/{github_project}/master/LICENSE.md"
    module["download"] = f"https://github.com/{github_project}/archive/refs/tags/{module_version}.zip"
    module["version"] = module_version
    return module


if __name__ == '__main__':
    main()
