import React from "react";

const Languages = () => {
    const lngs = {
        vn: { nativeName: VietNam },
        en: { nativeName: English },
        cn: { nativeName: China },
    };
    return (
        <div>
            <div>
                {Object.keys(lngs).map((lng) => (
                    <button
                        key={lng}
                        style={{
                            fontWeight:
                                i18n.resolvedLanguage === lng
                                    ? "bold"
                                    : "normal",
                        }}
                        type="submit"
                        onClick={() => {
                            i18n.changeLanguage(lng);
                            setCounter(count + 1);
                        }}
                    >
                        {lngs[lng].nativeName}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Languages;
