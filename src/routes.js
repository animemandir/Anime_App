import ProfileInformation from "@/components/ProfileInformation";
import LibraryList from "@/components/LibraryList";
import PersonalityQuiz from "@/components/PersonalityQuiz";
import UserAnimeLists from "@/pages/UserAnimeLists";
import RandomAnime from "@/components/RandomAnime";

export default [
    { path: '/', component: LibraryList},
    { path: '/account', component: ProfileInformation},
    { path: '/quiz', component: PersonalityQuiz},
    { path: '/lists', component: UserAnimeLists},
    {path: '/random', component: RandomAnime},
]