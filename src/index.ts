import $ from "jquery";

function downloadVideo() {
    const sMain = document.getElementById("s_main") as HTMLFrameElement;
    const frameDocument = sMain.contentDocument || sMain.contentWindow?.document!;
    const videoTag = frameDocument.getElementById("jp_video_0") as HTMLVideoElement;
    const videoSrc = videoTag.src;

    const splitUrl = videoSrc.split("/");
    const fileName = decodeURIComponent(splitUrl[splitUrl.length - 1]);

    const progress = insertProgressBar();

    GM_download({
        url: videoSrc,
        name: fileName,
        saveAs: true,
        onprogress: updateProgress(progress),
        onload: removeProgress,
        onerror: handleDownloadError,
        ontimeout: handleTimeout,
    });
}

function insertProgressBar(): JQuery<HTMLProgressElement> {
    const sSysbar = document.getElementById("s_sysbar") as HTMLFrameElement;
    const sysbarDocument = sSysbar.contentDocument || sSysbar.contentWindow?.document!;

    $("ul.nav", sysbarDocument).append(`
        <li class="divider test" style=""></li>
        <li class="test"><span style="color: #707070">下載進度:</span>
            <progress id="progress" max="100" value="0"></progress>
        </li>
    `);

    return $("#progress", sysbarDocument);
}

function updateProgress(progress: JQuery<HTMLProgressElement>) {
    return function(response: Tampermonkey.DownloadProgressResponse) {
        const percentage = response.done / response.total * 100;
        progress.val(percentage);
    }
}

function removeProgress() {
    const sSysbar = document.getElementById("s_sysbar") as HTMLFrameElement;
    const sysbarDocument = sSysbar.contentDocument || sSysbar.contentWindow?.document!;

    $(".test", sysbarDocument).remove();
}

function handleDownloadError(response: Tampermonkey.DownloadErrorResponse) {
    removeProgress();

    GM_notification({
        text: `Error occurred: ${response.details}`,
        timeout: 5000,
    });
}

function handleTimeout() {
    removeProgress();

    GM_notification({
        text: `超過預定時間`,
        timeout: 5000,
    });
}

GM_registerMenuCommand("下載影片", downloadVideo, "v");
