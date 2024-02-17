import { createSlice } from '@reduxjs/toolkit';

type SharedState = {
  micInfo: {
    mics: MediaDeviceInfo[],
    selectedMic: MediaDeviceInfo | null,
  };
  cameraInfo: {
    cameras: MediaDeviceInfo[],
    selectedCamera: MediaDeviceInfo | null,
  };
  speakerInfo: {
    speakers: MediaDeviceInfo[],
    selectedSpeaker: MediaDeviceInfo | null,
  };
}

const initialState: SharedState = {
  micInfo: {
    mics: [],
    selectedMic: null,
  },
  cameraInfo: {
    cameras: [],
    selectedCamera: null,
  },
  speakerInfo: {
    speakers: [],
    selectedSpeaker: null,
  },
};

const sharedSlice = createSlice({
  name: 'shared',
  initialState,
  reducers: {
    setMics(state, action) {
      state.micInfo.mics = action.payload;
    },
    setSelectedMic(state, action) {
      state.micInfo.selectedMic = action.payload;
    },
    setCameras(state, action) {
      state.cameraInfo.cameras = action.payload;
    },
    setSelectedCamera(state, action) {
      state.cameraInfo.selectedCamera = action.payload;
    },
    setSpeakers(state, action) {
      state.speakerInfo.speakers = action.payload;
    },
    setSelectedSpeaker(state, action) {
      state.speakerInfo.selectedSpeaker = action.payload;
    }
  },
});

export const {
  setMics,
  setSelectedMic,
  setCameras,
  setSelectedCamera,
  setSpeakers,
  setSelectedSpeaker,
} = sharedSlice.actions;

export default sharedSlice.reducer;
