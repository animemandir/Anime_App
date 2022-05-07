import ProfileInformation from "@/components/ProfileInformation";
import LibraryList from "@/components/LibraryList";
import PersonalityQuiz from "@/components/PersonalityQuiz";

export default [
    { path: '/', component: LibraryList},
    { path: '/account', component: ProfileInformation},
    { path: '/quiz', component: PersonalityQuiz}
]