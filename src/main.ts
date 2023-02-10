
import data from '../items.json' assert { type: "json" };

const text = await Deno.readTextFile("../data.md");
const lines = text.split('\n')

const markdownItems: { name: string, url: string }[] = []

lines.forEach((line: string) => {
  if (line.startsWith('* ')) {
    const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=&#]+)\)$/
    const link = line.substring(2)
    const match = link.match(regex)
    if (match) {
      const [_, name, url] = match;
      markdownItems.push({ name, url })
    }
  }
});

const jsonUrls: string[] = []

data.items.forEach(({twitch, url, youtube }) => {
  if(twitch) jsonUrls.push(twitch)
  if(url) jsonUrls.push(url)
  if(youtube) jsonUrls.push(youtube)
});

const missing = markdownItems.filter(({ url }) => !jsonUrls.includes(url))


console.log({ jsonUrls, markdownItems, missing });
