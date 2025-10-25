import Link from "next/link";
import { cn } from "@/lib/utils";
import LogoGithub from "./icons/logo-github";
import LogoLinkedIn from "./icons/logo-linkedin";
import { Separator } from "./ui/separator";

export default function Footer() {
  const socials = [
    {
      link: "https://github.com/patelka2211",
      icon: <LogoGithub />,
    },
    {
      link: "https://linkedin.com/in/kartavyapatel",
      icon: <LogoLinkedIn className="w-[24px]" />,
    },
  ];

  return (
    <>
      <Separator />
      <div className={cn("p-2", "flex items-center justify-between", "w-full")}>
        <div className="flex gap-4">
          {socials.map(({ icon, link }) => (
            <Link href={link} target="_blank" key={link}>
              {icon}
            </Link>
          ))}
        </div>
        <p className="p-2">© 2025 KP</p>
      </div>
    </>
  );
}
