import { Routes, Route } from "react-router-dom";
import UserForm from "./Components/UserForm";
import Dashboard from "./Components/Dashboard";
import SkillAssessment from "./Components/SkillAssessment";
import JobTrends from "./Components/CarrerPath";
import SkillsNeed from "./Components/SkillsNeed";
import { Provider } from 'react-redux'
// import PerformanceBasedRecommendation from "./Components/PerformanceBasedRecommendation";

import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/skill-assessment" element={<SkillAssessment />} />
      <Route path="/job-trends" element={<JobTrends />} />
      <Route path="/skillsNeed" element={<SkillsNeed/>}/>
      {/* <Route path="/performance-recommendation" element={<PerformanceBasedRecommendation />}/> */}
    </Routes>
    </Provider>
  );
}

export default App;
