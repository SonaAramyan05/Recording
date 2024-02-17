import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const sharedSelector = (state: RootState) => state.shared;

export const selectedMicSelector = createSelector(
    sharedSelector,
    (shared) => shared.micInfo.selectedMic
);
export const selectedCameraSelector = createSelector(
    sharedSelector,
    (shared) => shared.cameraInfo.selectedCamera
);
export const selectedSpeakerSelector = createSelector(
    sharedSelector,
    (shared) => shared.speakerInfo.selectedSpeaker
);
export const micsSelector = createSelector(
    sharedSelector,
    (shared) => shared.micInfo.mics
);
export const camerasSelector = createSelector(
    sharedSelector,
    (shared) => shared.cameraInfo.cameras
);
export const speakersSelector = createSelector(
    sharedSelector,
    (shared) => shared.speakerInfo.speakers
);
