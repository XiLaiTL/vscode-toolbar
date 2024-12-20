import { toggleBlockContainer } from "../markdown/block";

export type BlockAction = {
    argument: BlockActionArgument|string,
    mode: "block"
};

export interface BlockActionArgument{
    start: string,
    label?: string
    end?: string
}


export async function block(argument: string | BlockActionArgument) {
    if (typeof argument === "string") {
        await toggleBlockContainer(argument, argument, "");
    }
    else {
        await toggleBlockContainer(argument.start, argument.end ?? argument.start,argument.label ?? "");
    }
}