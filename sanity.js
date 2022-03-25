import {
    createImageUrlBuilder,
    createCurrentHook,
    createClient,
} from "next-sanity"; 

export const config = {

    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId : process.env.NEXT_PIBLIC_SANITY_PROJECT_ID = "q9v9t9zx",
    apiVersion: "2021-03-25",

    useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);


export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const useCurrentUser = createCurrentHook(config);

