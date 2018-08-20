import { colours } from "@times-components/styleguide";

const defaultHeadline =
  "Top medal for forces dog who took a bite out of the Taliban";
const defaultLabel = "Camilla Long";
const defaultParagraph =
  "The special forces dog fought on under fire, even after shrapnel from Taliban grenades tore into his belly and legs, blew out a front tooth and damaged his right ear.";

export default (
  {
    headline = defaultHeadline,
    label = defaultLabel,
    paragraph = defaultParagraph
  } = {}
) => ({
  url: "https://www.thetimes.co.uk/profile/camilla-long",
  image:
    "https://www.thetimes.co.uk/imageserver/image/methode%2Fsundaytimes%2Fprod%2Fweb%2Fbin%2F9242e576-4dfc-11e7-a20e-a11097d3353d.jpg?crop=1463%2C975%2C293%2C12",
  labelProps: {
    title: label,
    color: colours.functional.primary
  },
  headline,
  content: [
    {
      name: "paragraph",
      attributes: {},
      children: [
        {
          name: "text",
          attributes: {
            value: paragraph
          },
          children: []
        }
      ]
    }
  ]
});
