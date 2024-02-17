import React, { FC, useEffect, useRef } from "react";
import { streamProvider } from "../../providers/stream-provider";
import { useSelector } from "react-redux";
import {
    selectedCameraSelector,
    selectedMicSelector,
} from "../../store/shared/shared-selector";

type Props = {};

export const StreamComponent: FC<Props> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const selectedMic = useSelector(selectedMicSelector);
    const selectedCamera = useSelector(selectedCameraSelector);

    useEffect(() => {
        if (selectedMic && selectedCamera) {
            startStream();
        }
    }, [selectedMic, selectedCamera]);

    const startStream = async () => {
        await streamProvider.startStream(selectedMic, selectedCamera);

        if (videoRef.current) {
            videoRef.current.srcObject = streamProvider.stream;
            videoRef.current.autoplay = true;
            videoRef.current.play();
        }
    };

    return (
        <div>
            <video ref={videoRef}></video>
        </div>
    );
};
