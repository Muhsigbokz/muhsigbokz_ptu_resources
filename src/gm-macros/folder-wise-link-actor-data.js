// _id:m4byik5x5jsqm783
// name:[GM] Set LinkActorData for whole directories, no sub directories
// img:https://freepngimg.com/thumb/tool/1-2-tool-free-png-image.png
// Authors: Muhsigbokz

let agenda = [{"id": null, "path": ["Root"]}]
let all = []
const currentDialogId = randomID()

while (agenda.length > 0) {
    let current = agenda.pop()
    let current_folder = current["id"]
    let current_path = current["path"]

    game.folders.filter(f => f.data.parent == current_folder && f.data.type == "Actor").forEach(f => {
        agenda.push({"id": f.data._id, "path": current_path.concat([f.data.name])})
    })

    all.push({"id": current_folder, "path": current_path})
}
let msg = "<table>"

all.forEach(x => {
    msg += `<tr><td>${x["path"].join(">")}</td><td><input type="checkbox" value="${x["id"]}" class="${currentDialogId}"/></td></tr>`
})
msg += `</table>`
let d = new Dialog({
    title: "Link/Unlink Tokens",
    content: msg,
    buttons: {
        one: {
            icon: '<i class="fas fa-check"></i>',
            label: "Link Tokens",
            callback: () => {

                const changedFolders = [...new Set([...document.getElementsByClassName(currentDialogId)].filter(cb => cb.checked).map(cb => cb.value))]
                console.log(changedFolders)
                for (const folder of changedFolders) {
                    game.actors.filter(a => a.data.folder == folder).forEach(actor => {
                        actor.update({"token.actorLink": true})
                    })
                }
            }
        },
        two: {
            icon: '<i class="fas fa-check"></i>',
            label: "Unlink Tokens",
            callback: () => {

                const changedFolders = [...new Set([...document.getElementsByClassName(currentDialogId)].filter(cb => cb.checked).map(cb => cb.value))]
                console.log(changedFolders)
                for (const folder of changedFolders) {
                    game.actors.filter(a => a.data.folder == folder).forEach(actor => {
                        actor.update({"token.actorLink": false})
                    })
                }
            }
        }
    },
    default: "two",
    render: html => console.log(""),
    close: html => console.log("Closed Training Selection Dialog")
}, {width: 1200});
d.render(true);