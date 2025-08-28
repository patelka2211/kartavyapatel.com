import Image from "next/image";
import Link from "next/link";
import CompiledMdx from "@/components/compiled-mdx";

const ProfilePic = async () => (
  <div className="w-full">
    <Image
      className="rounded-full m-auto w-[56%] max-w-[192px] aspect-square"
      width={128}
      height={128}
      alt="Kartavya Patel"
      src={"https://avatars.githubusercontent.com/u/82671701"}
    />
  </div>
);

export default async function Home() {
  return (
    <CompiledMdx
      source={`<ProfilePic />
        
        Hi, I'm **Kartavya Patel**. Though most people know me as **KP**.

        I'm currently pursuing a Master's in Computer Science at [Florida Atlantic University](https://fau.edu), building on my Bachelor's degree in Computer Science from [Nirma University](https://nirmauni.ac.in). My academic journey has shaped not just my technical skills, but also my curiosity for understanding how people and systems work.

        Recently, I've developed a passion for reading, especially books on human psychology. I've enjoyed exploring **In Sheep's Clothing** by *George K. Simon* and am currently reading **Stillness is the Key** by *Ryan Holiday*. These books have inspired me to reflect more deeply on human behavior, decision-making, and the value of self-awareness.

        Beyond academics and reading, I'm also working on sharing my thoughts through writing. Soon, you'll find my blogs and posts on various topics over <Link href="/posts">here</Link>.

        Thanks for stopping by. I'm excited to share my journey with you.

        <div className="flex justify-end">-KP</div>`}
      components={{ Link, ProfilePic }}
    />
  );
}
