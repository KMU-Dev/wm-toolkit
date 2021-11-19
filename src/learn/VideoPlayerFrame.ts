import Frame from '../lib/Frame';
import MoocHeaderFrame from './MoocHeaderFrame';

export default class VideoPlayerFrame extends Frame {
    private commandId?: number;
    private fileURL?: string;

    onLoad() {
        this.commandId = GM_registerMenuCommand('下載影片', this.handleVideoDownload.bind(this), 'v');
    }

    beforeUnload() {
        if (this.commandId) GM_unregisterMenuCommand(this.commandId);
    }

    private handleVideoDownload() {
        const params = new URLSearchParams(this.location.search.substring(1));
        this.fileURL = `${this.location.origin}${params.get('file')}`;

        const splitURL = this.fileURL.split('/');
        const filename = decodeURIComponent(splitURL[splitURL.length - 1]);

        console.log(this.fileURL);
        console.log(filename);

        this.broadcastMessage([MoocHeaderFrame], 'init', this.fileURL);

        GM_download({
            url: this.fileURL,
            name: filename,
            saveAs: true,
            onprogress: this.handleProgressUpdate.bind(this),
            onload: this.handleVideoLoad.bind(this),
            onerror: this.handleDownloadError.bind(this),
            ontimeout: this.handleTimeout.bind(this),
        });
    }

    private handleProgressUpdate(response: Tampermonkey.DownloadProgressResponse) {
        const percentage = (response.done / response.total) * 100;
        this.broadcastMessage([MoocHeaderFrame], 'progress', { url: this.fileURL, progress: percentage });
    }

    private handleVideoLoad() {
        this.broadcastMessage([MoocHeaderFrame], 'finish', this.fileURL);
    }

    private handleDownloadError(response: Tampermonkey.DownloadErrorResponse) {
        this.broadcastMessage([MoocHeaderFrame], 'finish', this.fileURL);

        GM_notification({
            text: `錯誤: ${response.details}`,
            timeout: 5000,
        });
    }

    private handleTimeout() {
        this.broadcastMessage([MoocHeaderFrame], 'finish', this.fileURL);

        GM_notification({
            text: `超過預定時間`,
            timeout: 5000,
        });
    }
}
