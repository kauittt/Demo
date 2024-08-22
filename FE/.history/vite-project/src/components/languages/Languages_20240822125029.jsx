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
    const [currentLanguage, setCurrentLanguage] = useState(
        i18n.resolvedLanguage
    );

    // useEffect(() => {
    //     const handleLanguageChange = () => {
    //         setCurrentLanguage(i18n.resolvedLanguage);
    //     };

    //     i18n.on("languageChanged", handleLanguageChange);

    //     // Call manually the first time in case the event has already fired
    //     handleLanguageChange();

    //     //! Clean khi unmounted hoặc chạy lại
    //     return () => {
    //         i18n.off("languageChanged", handleLanguageChange);
    //     };
    // }, [i18n]);

    return (
        <div
            className="fixed flex flex-center gap-[10px]
            right-[50%] translate-x-[50%]
        "
        >
            {Object.keys(lngs).map((lng) => (
                <button
                    className={`p-[10px] text-lg ${
                        currentLanguage === lng ? "font-bold" : ""
                    }
                    hover:text-main transition-base`}
                    key={lng}
                    type="submit"
                    onClick={() => {
                        console.log(i18n.resolvedLanguage);

                        i18n.changeLanguage(lng);
                        console.log(i18n.resolvedLanguage);
                    }}
                >
                    {lngs[lng].nativeName}
                </button>
            ))}
        </div>
    );
};

export default Languages;
