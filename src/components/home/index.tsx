import React, { FC, useEffect } from "react";
import { devicesProvider } from "../../providers/devices-provider";
import { StreamComponent } from "../stream-component";
import { Settings } from "../settings";

export const Home: FC = () => {
    useEffect(() => {
        devicesProvider.getDevices();
    }, []);

    return (
        <div>
            <StreamComponent />
            <Settings />
        </div>
    );
};
