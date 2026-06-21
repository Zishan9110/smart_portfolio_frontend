import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import projectsReducer from '../features/projects/projectsSlice';
import skillsReducer from '../features/skills/skillsSlice';
import experienceReducer from '../features/experience/experienceSlice';
import educationReducer from '../features/education/educationSlice';
import certificationsReducer from '../features/certifications/certificationsSlice';
import achievementsReducer from '../features/achievements/achievementsSlice';
import toolsReducer from '../features/tools/toolsSlice';
import contactReducer from '../features/contact/contactSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import timelineReducer from '../features/timeline/timelineSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    projects: projectsReducer,
    skills: skillsReducer,
    experience: experienceReducer,
    education: educationReducer,
    certifications: certificationsReducer,
    achievements: achievementsReducer,
    tools: toolsReducer,
    contact: contactReducer,
    dashboard: dashboardReducer,
    timeline: timelineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // file uploads use FormData, which isn't fully serializable
    }),
});

export default store;
