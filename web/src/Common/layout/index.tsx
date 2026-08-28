import NavBar from "../Components/NavBar.tsx";
import Footer from "../Components/Footer.tsx";

export default function layout({children}: {children: React.ReactNode}) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}