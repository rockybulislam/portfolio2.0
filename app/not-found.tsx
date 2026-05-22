import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function NotFoundSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className="h-full w-full text-primary"
      fill="none"
      aria-hidden="true"
    ></svg>
  );
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.07),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.06),transparent_42%)]" />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,transparent_0%,rgba(148,163,184,0.04)_50%,transparent_100%)] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl md:p-12">
        <div className="mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-3xl border border-border/60 bg-background/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.18)]">
          <Image
            src="/404.svg"
            alt="404 illustration"
            width={420}
            height={420}
            priority
            className="h-full w-full object-contain"
          />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Page not found
        </p>
        <h2 className="text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
          404
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-muted-foreground md:text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Use the button below to go back home.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <Button className="rounded-full px-6">Go Back Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
