let aboutText = `<p>Hello, my name is Vincent Tran, a.k.a. vihutr.</p>
<p>I'm a programmer, engineer, and problem solver.</p>
<p>I occasionally play around with art, music, and like to read.</p>
<p>I am working on multiple projects at once and often try not to use too many external packages to have a more personal understanding of how things work, so a lot of what you see has been made <i>mostly</i> from scratch.</p>
<p>Every part of this site, for example, utilizes very few external tools or abstraction layers that weren't made by myself, but maybe that will change eventually.</p>
<p>Currently looking for work, feel free to contact/check me out:</p>
<p>
<div id = "about-grid">
    <div class="contact-label"><ion-icon class="icon" name="logo-github"></ion-icon> <span class="icon-text">Github:</span></div>
    <div class="contact-link"><a class="custom-button" href="https://github.com/vihutr"><span class="icon-text">vihutr</a></div>

    <div class="contact-label"><ion-icon class="icon" name="mail-outline"></ion-icon> <span class="icon-text">Email:</span></div>
    <div class="contact-link"><span class="custom-button fake-link" onclick="copyEmail(); return false;"><ion-icon class="icon" name="copy"></ion-icon> <span class="icon-text" id="email">moc.liamg@rtuhiv</span></span></div>

    <div class="contact-label"><ion-icon class="icon" name="document-text-outline"></ion-icon> <span class="icon-text">Resume:</span></div>
    <div class="contact-link"><a class="custom-button" id="resume" href=https://docs.google.com/document/d/1x4gQT8d2groLLyiGS7Lpcj71TsVz2qCcb5rU_907Cn0/edit?usp=sharing><span class="icon-text">Google Docs</a></div>
</div>`;
let projectsText = `<div id = "project-container" class = "project-container">`;
// let hiddenText = `<a href="./game.html"><img id="rpg" src="images/rpg/rpg.png"></a>
// <a href="./alice.html"><img id="alice" src="images/rpg/alice.png"></a>
// `;
let hiddenText = `<a href="./alice.html"><img id="alice" src="images/rpg/alice.png"></a>`;

let otherText = `maybe blog links? we will see, also tailscale + npx is a great way to test on mobile btw :)`;

let aboutHTML = document.createElement("about-container")
aboutHTML.innerHTML = aboutText;

let projectsHTML = document.createElement("project-container")
function loadProjects(url, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(JSON.parse(xmlHttp.responseText));
            projectsHTML.innerHTML = projectsText;
            projectsHTML.innerHTML += hiddenText;
            addProjectExpansions(projectsHTML);
            // project expansion behavior
        }
    }
    xmlHttp.open('GET', url, true);
    xmlHttp.send(null);
}

let blogText = `
`
let blogHTML = document.createElement("blog-container");
blogHTML.innerHTML = blogText;

const blogDir = './blog/';
const entriesJson = 'blog_entries.json'

async function loadJson(filename) {
    const resp = await fetch(filename);
    return await resp.json();
}

async function createBlogEntryLinks() {
    // loop through directory and add links
    let entries = await loadJson(entriesJson);
    for (const entry of entries) {
        let label = entry.split('.')[0].replaceAll('-', '/')
        let link = `<p><a class="blog-link" href="./${blogDir}${entry}">${label}</a></p>`;
        blogHTML.innerHTML += link;
    }
    blogHTML.innerHTML += '</div>'
}

async function loadBlogEntry() {
    // consider loading a single container with conents of md
    // and parsing using below fucntion
}


function simpleMarkdown(md) {
    let html = md;

    // headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // bold / italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');
    html = html.replace(/\*(.*?)\*/gim, '<i>$1</i>');

    // links [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>");

    // unordered lists
    html = html.replace(/^\s*[-+*]\s+(.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');

    // paragraphs (wrap remaining text lines in <p>)
    html = html.replace(/^(?!<h\d>|<ul>|<li>|<p>|<b>|<i>|<a)(.+)$/gim, '<p>$1</p>');

    return html.trim();
}

function addProjectExpansions(HTML) {
    const projectImgs = HTML.querySelectorAll('[proj-img]');
    const projectDescs = HTML.querySelectorAll('[proj-desc]');

    projectImgs.forEach(image => {
        image.parentElement.setAttribute('selected', 'false');
        image.addEventListener('click', (e) => {
            // console.log('button click');
            toggle = e.target;
            toggleParent = toggle.parentElement;
            toggleDesc = toggleParent.nextElementSibling;
            if (toggleParent.getAttribute('selected') === 'false'){
                // console.log('non active button clicked');
                // hide all project descs
                projectDescs.forEach(openDesc => {
                    if (!openDesc.classList.contains('is-hidden')) {
                        // console.log('active desc found');
                        openToggleParent = openDesc.previousElementSibling;
                        openToggleParent.setAttribute('selected', 'false');
                        openToggleParent.style.setProperty('filter', 'brightness(50%)');

                        openDesc.classList.toggle('is-hidden');
                    }
                });
                // console.log('activating clicked button');
                toggleParent.setAttribute('selected', 'true');
                toggleParent.style.setProperty('filter', 'brightness(100%)');
                toggleDesc.classList.toggle('is-hidden');
            } else {
                // hide selected
                // console.log('active button clicked, hiding');
                toggleParent.setAttribute('selected', 'false');
                toggleParent.style.setProperty('filter', 'brightness(50%)');
                toggleDesc.classList.toggle('is-hidden');
            }
        });
    });

}

//todo: fixup css on project-expanded, add name of project (to grid/flex as ell withint project-expanded)
function projectHTML(obj) {
    html = `<div class="project">
                <div class="project-image" style="background-image: url('images/projects/${obj['filename']}.png')" proj-img></div>
            </div>
            <div class="project-expanded is-hidden" id="${obj['filename']}" proj-desc>
                <div class="project-name">${obj['name']}</div>
                <div class="project-links">${projectLinks(obj['links'])}</div>
                <div class="project-desc">${obj['desc']}</div>
            </div>
            `;
    return html;
}

function projectLinks(obj) {
    html = ``;
    for (const link of obj){
        github = link['github'];
        steam = link['steam'];
        youtube = link['youtube'];
        direct_link = link['link'];
        if (typeof(github) !== "undefined") {
            html += `<a href="${github}" class="project-link custom-button"><ion-icon name="logo-github"></ion-icon></a>`;
        }
        if (typeof(steam) !== "undefined") {
            html += `<a href="${steam}" class="project-link custom-button"><ion-icon name="logo-steam"></ion-icon></a>`;  
        }
        if (typeof(youtube) !== "undefined") {
            html += `<a href="${youtube}" class="project-link custom-button"><ion-icon name="logo-youtube"></ion-icon></a>`;  
        }
        if (typeof(direct_link) !== "undefined") {
            html += `<a href="${direct_link}" class="project-link custom-button"><ion-icon name="link"></ion-icon></a>`;  
        }
    }
    return html;
}

function getProjectsText(data) {
    for (const proj of data['Projects']) {
        projectsText += projectHTML(proj);
    }
    projectsText += "</div>"
}

function setMain(html) {
    document.getElementById('main').replaceChildren(html);
    if (html == aboutHTML) { 
        document.getElementById("logo").classList.add("awake");
        document.getElementById("logo").classList.remove("sleep");
    } else {
        document.getElementById("logo").classList.add("sleep");
        document.getElementById("logo").classList.remove("awake");
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function floatingMessage(str) {
    let fmsg = document.createElement('div');
    fmsg.textContent = str;
    fmsg.style.position = 'fixed';
    fmsg.style.left = event.clientX 
}

function copyEmail() {
    const email = document.getElementById("email");
    copyToClipboard(reverseString("moc.liamg@rtuhiv"));

    const rect = email.getBoundingClientRect();
    const floatMsg = document.createElement('div');
    floatMsg.textContent = 'Email Copied!';
    floatMsg.style.position = 'fixed';
    floatMsg.style.backgroundColor = 'rgb(25, 25, 25)';
    floatMsg.style.padding = '10px';
    floatMsg.style.zIndex = '1000';
    document.body.appendChild(floatMsg);
    floatMsg.style.left = rect.left + window.scrollX - floatMsg.clientWidth - 30 + 'px';
    floatMsg.style.top = rect.top + window.scrollY + 'px';
    let msgTimer = 500;
    setTimeout(function() {
        floatMsg.remove();
    }, msgTimer);
}

window.mobileAndTabletCheck = function() {
    let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function disableFakeLinkDrag(doc) {
    const btns = doc.getElementsByClassName("fake-link");
    Array.prototype.forEach.call(btns, function(btn) {
        btn.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

// var lastUpdate = Date.now();
// var myInterval = setInterval(tick, 0);
// 
// function tick() {
//     var now = Date.now();
//     var dt = now - lastUpdate;
//     lastUpdate = now;
// }



loadProjects('./projects.json', getProjectsText);
createBlogEntryLinks();
disableFakeLinkDrag(document);
setMain(aboutHTML)
