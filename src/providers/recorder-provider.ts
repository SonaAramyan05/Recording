import { recordingDBProvider } from "./recording-db-provider";

const CHUNK_DURATION = 8000;

class RecorderProvider {
    private recorder: MediaRecorder | null = null;
    private chunkId = 1;

    start(stream: MediaStream) {
        this.recorder = new MediaRecorder(stream);

        this.recorder.onstart = () => {
            console.log("Recording started");
        };

        this.recorder.ondataavailable = (event) => {
            console.log("Data available");
            recordingDBProvider
                .addItem({
                    chunkId: this.chunkId++,
                    data: event.data,
                })
                .then(() => {
                    console.log(`Chunk with ${this.chunkId} id was added.`);
                });
        };

        this.recorder.onstop = () => {
            console.log("Recording started");
        };

        this.recorder.start(CHUNK_DURATION);
    }

    stop() {
        if (!this.recorder) {
            return;
        }
        this.recorder.stop();
        this.recorder = null;
    }
}

export const recorderProvider = new RecorderProvider();
