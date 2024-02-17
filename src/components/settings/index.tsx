import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedMic,
    setSelectedCamera,
} from "../../store/shared/shared-slice";
import {
    camerasSelector,
    micsSelector,
    selectedCameraSelector,
    selectedMicSelector,
} from "../../store/shared/shared-selector";
import { devicesProvider } from "../../providers/devices-provider";

export const Settings: FC = () => {
    const dispatch = useDispatch();

    const [selectedMicId, setSelectedMicId] = useState<string | undefined>(
        undefined
    );
    const [selectedCameraId, setSelectedCameraId] = useState<
        string | undefined
    >(undefined);
    const selectedMic = useSelector(selectedMicSelector);
    const selectedCamera = useSelector(selectedCameraSelector);
    const mics = useSelector(micsSelector);
    const cameras = useSelector(camerasSelector);

    useEffect(() => {
        devicesProvider.getDevices();
    }, []);

    const handleMicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const micId = event.target.value;
        setSelectedMicId(micId);
        dispatch(setSelectedMic(micId));
    };

    const handleCameraChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const cameraId = event.target.value;
        setSelectedCameraId(cameraId);
        dispatch(setSelectedCamera(cameraId));
    };

    return (
        <div>
            <h2>Settings</h2>
            <div>
                <label htmlFor="microphone">Microphone:</label>
                <select
                    id="microphone"
                    value={selectedMicId || selectedMic?.deviceId}
                    onChange={handleMicChange}
                >
                    <option value="">Select Microphone</option>
                    {/* Map over microphone devices and render options */}
                    {mics.map((mic) => (
                        <option key={mic.deviceId} value={mic.deviceId}>
                            {mic.label}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="camera">Camera:</label>
                <select
                    id="camera"
                    value={selectedCameraId || selectedCamera?.deviceId}
                    onChange={handleCameraChange}
                >
                    <option value="">Select Camera</option>
                    {/* Map over camera devices and render options */}
                    {cameras.map((camera) => (
                        <option key={camera.deviceId} value={camera.deviceId}>
                            {camera.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
