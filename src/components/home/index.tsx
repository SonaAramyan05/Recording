import React, { FC, useEffect, useState } from "react";
import { devicesProvider } from "../../providers/devices-provider";
import { StreamComponent } from "../stream-component";
import { Settings } from "../settings";
import { dbConnectionProvider } from "../../providers/db-connection-provider";
import { recordingDBProvider } from "../../providers/recording-db-provider";
import { streamProvider } from "../../providers/stream-provider";
import { recorderProvider } from "../../providers/recorder-provider";
import { Chunk } from "../../types";

export const Home: FC = () => {
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        dbConnectionProvider.openDB();
    }, []);

    // const addItem = async () => {
    //     await dbConnectionProvider.isDBOpenedDefer.promise;
    //     await recordingDBProvider.addItem({ chunkId: 1, data: new Blob() });
    // };

    const toggleRecording = async () => {
        const stream = streamProvider.stream;
        isRecording
            ? recorderProvider.stop()
            : stream && recorderProvider.start(stream);
        setIsRecording((isRecording) => !isRecording);
    };

    const onDownload = async () => {
        const chunks = (await recordingDBProvider.getItems()) as Chunk[];
        if (!chunks.length) {
            return;
        }
        const blob = new Blob(
            chunks.map((chunk) => chunk.data),
            { type: "video/webm" }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recording.webm";
        a.click();
    };

    return (
        <div>
            <StreamComponent />
            <Settings />
            <button onClick={toggleRecording}>
                {isRecording ? "Stop" : "Start"} recording
            </button>
            {!isRecording && (
                <button onClick={onDownload}>Download recording</button>
            )}
        </div>
    );
};
