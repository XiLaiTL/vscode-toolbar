export type ActivateArgument = {
    languages: string[],
    hover?: boolean,
};

export type Activate = ActivateArgument | boolean;

export function checkActivated(activate: Activate|undefined, language: string, checkHover:boolean=false) {
    return (activate === undefined) ? false
        : (typeof activate === "boolean") ? activate
        : (!checkHover || activate.hover === undefined || activate.hover === true) ? activate.languages.includes(language)
        : false
        ;
}