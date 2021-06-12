import $ from "jquery";
import CommandHandler from "./CommandHandler";

export default class DownloadVideoCommand extends CommandHandler {

    readonly handle = () => {
        const sMain = document.getElementById("s_main") as HTMLFrameElement;
        const frameDocument = sMain.contentDocument || sMain.contentWindow?.document!;
        const videoTag = frameDocument.getElementById("jp_video_0") as HTMLVideoElement;
        const videoSrc = videoTag.src;

        const splitUrl = videoSrc.split("/");
        const fileName = decodeURIComponent(splitUrl[splitUrl.length - 1]);

        //this.test();
        const progress = this.insertProgressBar();

        GM_download({
            url: videoSrc,
            name: fileName,
            saveAs: true,
            onprogress: this.updateProgress(progress),
            onload: this.removeProgress,
            onerror: this.handleDownloadError,
            ontimeout: this.handleTimeout,
        });
    }

    private readonly handleDownloadError = (response: Tampermonkey.DownloadErrorResponse) => {
        this.removeProgress();
    
        GM_notification({
            text: `Error occurred: ${response.details}`,
            timeout: 5000,
        });
    }
    
    private readonly handleTimeout = () => {
        this.removeProgress();
    
        GM_notification({
            text: `超過預定時間`,
            timeout: 5000,
        });
    }

    private insertProgressBar (): JQuery<HTMLProgressElement> {
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
    
    private updateProgress(progress: JQuery<HTMLProgressElement>) {
        return function(response: Tampermonkey.DownloadProgressResponse) {
            const percentage = response.done / response.total * 100;
            progress.val(percentage);
        }
    }
    
    private removeProgress() {
        const sSysbar = document.getElementById("s_sysbar") as HTMLFrameElement;
        const sysbarDocument = sSysbar.contentDocument || sSysbar.contentWindow?.document!;
    
        $(".test", sysbarDocument).remove();
    }
}