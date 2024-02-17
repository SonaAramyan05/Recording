import { setCameras, setMics, setSpeakers } from "../store/shared/shared-slice";
import { store } from "../store";

class DevicesProvider {
    private isRequested: boolean = false;
    constructor() {
        navigator.mediaDevices.ondevicechange = () => {
            navigator.mediaDevices.ondevicechange = () => {
                this.getDevices();
            };
        };
    }

    async requestDevices() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        stream.getTracks().forEach((track) => track.stop());
    }

    async getDevices() {
        if (!this.isRequested) {
            await this.requestDevices();
            this.isRequested = true;
        }

        navigator.mediaDevices.enumerateDevices().then((devices) => {
            const mics = devices.filter(
                (device) => device.kind === "audioinput"
            );
            const cameras = devices.filter(
                (device) => device.kind === "videoinput"
            );
            const speakers = devices.filter(
                (device) => device.kind === "audiooutput"
            );

            store.dispatch(setMics(mics));
            store.dispatch(setCameras(cameras));
            store.dispatch(setSpeakers(speakers));
        });
    }
}

export const devicesProvider = new DevicesProvider();
