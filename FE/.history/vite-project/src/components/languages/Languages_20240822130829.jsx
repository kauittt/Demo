import { useEffect, useState } from "preact/hooks";
import React from "react";
import { useTranslation, Trans } from "react-i18next";

const Languages = () => {
    const lngs = {
        vn: { nativeName: "Vietnam" },
        en: { nativeName: "English" },
        cn: { nativeName: "China" },
    };

    const { i18n } = useTranslation();
    const current = localStorage.getItem("i18nextLng").split("-")[0];
    // const [currentLanguage, setCurrentLanguage] = useState(
    //     i18n.resolvedLanguage
    // );

    // useEffect(() => {
    //     console.log("useEffect");
    //     const handleLanguageChange = () => {
    //         // This will ensure that the currentLanguage is updated only after
    //         // i18next has completed the language change process
    //         setCurrentLanguage(i18n.resolvedLanguage);
    //     };

    //     // Register the event listener for language changes
    //     i18n.on("languageChanged", handleLanguageChange);

    //     // Call manually the first time in case the event has already fired
    //     handleLanguageChange();

    //     // Clean up the event listener when the component unmounts or dependencies change
    //     return () => {
    //         i18n.off("languageChanged", handleLanguageChange);
    //     };
    // }, [i18n]);

    return (
        <div
            className="fixed flex flex-center gap-[10px]
            right-[50%] translate-x-[50%]"
        >
            {Object.keys(lngs).map((lng) => (
                <button
                    className={`p-[10px] text-lg ${
                        i18n.language === lng ? "font-bold" : ""
                    }
                    hover:text-main transition-base`}
                    key={lng}
                    type="submit"
                    onClick={() => {
                        i18n.changeLanguage(lng);
                    }}
                >
                    {lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
};

export default Languages;
