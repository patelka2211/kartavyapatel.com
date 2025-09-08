"use client";
import {
  FileTextIcon,
  HomeIcon,
  MoonIcon,
  ShareIcon,
  SunIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { type HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import DeviceDesktop from "./icons/device-desktop";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const CustomButton = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) => (
  <Button
    variant={"secondary"}
    className={cn(
      "cursor-pointer",
      "border",
      "rounded-full",
      "hover:bg-accent hover:text-accent-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </Button>
);

export default function FloatingMenu() {
  const { theme, setTheme } = useTheme();

  const [themeIcon, setThemeIcon] = useState(<DeviceDesktop />);

  function themeChange() {
    switch (theme) {
      case "dark":
        setTheme("light");
        setThemeIcon(<SunIcon />);
        break;
      case "light":
        setTheme("system");
        setThemeIcon(<DeviceDesktop />);
        break;
      case "system":
        setTheme("dark");
        setThemeIcon(<MoonIcon />);
        break;
      default:
        break;
    }
  }

  const links = [
    { url: "/", name: "Home", icon: <HomeIcon /> },
    { url: "/posts", name: "Posts", icon: <FileTextIcon /> },
  ];

  const pathname = usePathname().split("/").slice(0, 2).join("/");

  const router = useRouter();

  return (
    <div
      className={cn(
        "sticky bottom-4",
        "w-[calc(100%-2rem)]",
        "mx-auto",
        "flex items-center justify-between",
      )}
    >
      {links.map(({ url, name, icon }) => (
        <Tooltip key={url}>
          <TooltipTrigger asChild>
            <CustomButton
              key={url}
              title={name}
              className={
                pathname === url
                  ? "bg-primary hover:bg-primary text-primary-foreground hover:text-primary-foreground"
                  : ""
              }
              onClick={() => {
                router.push(url);
              }}
            >
              {icon}
            </CustomButton>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipTrigger asChild>
          <CustomButton onClick={themeChange}>{themeIcon}</CustomButton>
        </TooltipTrigger>
        <TooltipContent>{theme}</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <CustomButton
            onClick={() => {
              (
                window as typeof window & { Sharer: { open: () => void } }
              ).Sharer.open();
            }}
          >
            <ShareIcon />
          </CustomButton>
        </TooltipTrigger>
        <TooltipContent>Share</TooltipContent>
      </Tooltip>
    </div>
  );
}
