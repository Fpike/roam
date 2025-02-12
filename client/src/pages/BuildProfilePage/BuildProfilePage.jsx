import { NavBar } from "../../components/NavBar.jsx";
import { BuildProfileForm } from "../../components/BuildProfileForm/BuildProfileForm.jsx";
import { SelectTravellerType } from "../../components/TravellerType/SelectTravellerType.jsx";
import { SelectCountries } from "../../components/Countries/SelectCountries.jsx";

export function BuildProfilePage() {

    return (
        <>
            <NavBar />
            <div className="container vh-100 p-4" style={{backgroundColor: "white"}}>
                <div className="container">
                    <h3 style={{marginBottom: "30px"}}>Let's build your profile!</h3>
                    <SelectTravellerType />
                    <br />
                    <hr />
                    {/* <SelectCountries />
                    <br />
                    <hr /> */}
                    <div style={{marginTop: "30px"}}>
                    <BuildProfileForm />
                    </div>
                </div>
            </div>
        </>
    );
};
