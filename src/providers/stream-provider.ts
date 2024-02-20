class StreamProvider {
    stream: MediaStream | null = null;

    private async createStream(mic: MediaDeviceInfo, camera: MediaDeviceInfo) {
        this.stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: camera.deviceId },
            audio: { deviceId: mic.deviceId },
        });
    }

    async startStream(
        mic: MediaDeviceInfo | null,
        camera: MediaDeviceInfo | null
    ) {
        if (this.stream) {
            this.stopStream();
        }
        if (!mic || !camera) {
            return;
        }
        await this.createStream(mic, camera);
    }

    stopStream() {
        if (this.stream) {
            this.stream.getTracks().forEach((track) => track.stop());
            this.stream = null;
        }
    }
}

export const streamProvider = new StreamProvider();
