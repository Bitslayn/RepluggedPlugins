import { capitalizeWords } from "./helpers";
import { config } from "./icons";
import { WordConfig } from "./types";

const advancedChannelNames: WordConfig = config.get("advancedChannelNames");

const ChannelExample = ({ id, name }) => {
  let channelName;
  if (config.get("changeChannelNames", [])) {
    channelName = capitalizeWords(
      name,
      advancedChannelNames.specialCases,
      advancedChannelNames.lowercaseExceptions
    );
  } else {
    channelName = decapitalizeWords(name, advancedChannelNames.specialCases);
    console.log(advancedChannelNames);
  }
  return (
    <div className="channelExample">
      <div>
        <a
          data-list-item-id={`_${id}`}
          style={{
            cursor: "pointer",
            position: "relative",
            boxSizing: "border-box",
            padding: "6px 8px",
            borderRadius: "var(--radius-xs)",
            display: "flex",
            flexDirection: "column",
          }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div className="icon" style={{ position: "relative", marginRight: "6px" }}>
              <svg
                style={{
                  display: "block",
                  width: "20px",
                  height: "20px",
                  flex: "0 0 auto",

                  color: "var(--channel-icon)",
                }}
                aria-hidden="true"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M 10.99 3.16 A 1 1 0 1 0 9 2.84 L 8.15 8 H 4 a 1 1 0 0 0 0 2 h 3.82 l -0.67 4 H 3 a 1 1 0 1 0 0 2 h 3.82 l -0.8 4.84 a 1 1 0 0 0 1.97 0.32 L 8.85 16 h 4.97 l -0.8 4.84 a 1 1 0 0 0 1.97 0.32 l 0.86 -5.16 H 20 a 1 1 0 1 0 0 -2 h -3.82 l 0.67 -4 H 21 a 1 1 0 1 0 0 -2 h -3.82 l 0.8 -4.84 a 1 1 0 1 0 -1.97 -0.32 L 15.15 8 h -4.97 l 0.8 -4.84 Z M 14.15 14 l 0.67 -4 H 9.85 l -0.67 4 h 4.97 Z"
                  clip-rule="evenodd"
                  className=""></path>
              </svg>
            </div>
            <div
              className="name"
              aria-hidden="true"
              style={{
                color: "var(--channels-default)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",

                fontSize: "16px",
                lineHeight: "20px",
                fontWeight: "500",
                flex: "1 1 auto",

                position: "relative",
              }}>
              {channelName}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ChannelExample;

function decapitalizeWords(sentence: string, specialCases: any): string {
  const lowerCaseSpecialCases: { [key: string]: string } = {};
  for (const key in specialCases) {
    lowerCaseSpecialCases[key.toLowerCase()] = specialCases[key].toLowerCase();
  }

  const words: string[] = sentence.split(" ");
  const decapitalizedWords: string[] = words.map(word => {
    if (lowerCaseSpecialCases[word.toLowerCase()]) {
      return lowerCaseSpecialCases[word.toLowerCase()];
    }

    for (let a = 0; a < word.length; a++) {
      if (/[a-zA-Z]/.test(word[a])) {
        return word.slice(0, a) + word[a].toLowerCase() + word.slice(a + 1);
      }
    }
    return word;
  });
  return decapitalizedWords.join("-");
}