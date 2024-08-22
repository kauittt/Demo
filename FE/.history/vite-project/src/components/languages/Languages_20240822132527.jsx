import React from "react";
import { useTranslation } from "react-i18next";

const Languages = () => {
    const lngs = {
        vn: { nativeName: "Vietnam" },
        en: { nativeName: "English" },
        cn: { nativeName: "China" },
    };

    const { i18n } = useTranslation();

    //* Detector return: en-US, use getBase to get "en"
    const getBase = (lng) => {
        return lng.split("-")[0];
    };

    return (
        <div
            className="fixed flex flex-center gap-[10px]
            right-[50%] translate-x-[50%]"
        >
            {Object.keys(lngs).map((lng) => (
                <button
                    className={`p-[10px] text-lg ${
                        getBase(i18n.language) === lng
                            ? " text-main font-bold underline cursor-context-menu"
                            : "hover:text-main transition-base "
                    }
                    `}
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
