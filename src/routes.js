import ProfileInformation from "@/components/ProfileInformation";
import LibraryList from "@/components/LibraryList";
import LogInSignUp from "@/components/LogInSignUp";
import PersonalityQuiz from "@/components/PersonalityQuiz";

export default [
    { path: '/', component: LibraryList},
    { path: '/account', component: ProfileInformation},
    { path: '/sign-up', component: LogInSignUp},
    { path: '/quiz', component: PersonalityQuiz}
]