import React, { useEffect, useRef, useState } from "react";
import Counter from "@/components/mitra/Counter";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Cursor from "@/components/mitra/interactive/Cursor";
import Magnetic from "@/components/mitra/interactive/Magnetic";
import GlitchCounter from "@/components/mitra/interactive/GlitchCounter";

export default function Landing() {
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const frame = useRef(0);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current as any);
      frame.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setBgPos({ x, y });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      className="min-h-screen relative text-white"
      style={{
        background: `radial-gradient(circle at ${bgPos.x}% ${bgPos.y}%, #667eea, #764ba2)`,
      }}
    >
      <Cursor />
      <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-xl font-extrabold tracking-tight">MITRA</div>
        <nav className="hidden md:flex items-center gap-6 text-sm/relaxed">
          <a href="#features" className="opacity-80 hover:opacity-100">
            Features
          </a>
          <a href="#trust" className="opacity-80 hover:opacity-100">
            Trust
          </a>
          <a href="#testimonials" className="opacity-80 hover:opacity-100">
            Testimonials
          </a>
        </nav>
        <Magnetic>
          <Link to="/app/parent">
            <Button
              variant="secondary"
              className="bg-white text-[#5b5bd6] hover:bg-white/90"
              data-cursor="button"
            >
              Open App
            </Button>
          </Link>
        </Magnetic>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Every 1 hour, India loses a student.
              <span className="block mt-2">MITRA saves them.</span>
            </h1>
            <div className="mt-2 text-sm">
              A student lost in: <GlitchCounter start={28} />
            </div>
            <p className="mt-4 text-white/90">
              Early detection. Compassionate support. Parent coaching. Built
              with clinicians and validated by NIMHANS.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Link to="/app/parent">
                <Button className="bg-gradient-to-r from-[#667eea] to-[#764ba2]">
                  I'm a Parent
                </Button>
              </Link>
              <Link to="/app/student/chat">
                <Button
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  I'm a Student
                </Button>
              </Link>
            </div>
            <div className="mt-6 text-sm/relaxed grid grid-cols-2 gap-4 md:max-w-md">
              <Stat label="Lives saved" value={<Counter to={347} />} />
              <Stat
                label="Early detection"
                value={<span>6 weeks sooner</span>}
              />
              <Stat label="Cost" value={<span>₹99 vs ₹2000</span>} />
              <Stat label="Students lost/year" value={<span>13,089</span>} />
            </div>
          </div>
          <div>
            <div className="rounded-2xl backdrop-blur bg-white/10 p-6 border border-white/20 shadow-xl">
              <div className="text-sm/relaxed">Demo recovery journey</div>
              <div className="mt-2 text-4xl font-bold">3.2 → 8.9</div>
              <div className="mt-2 h-40 rounded-lg bg-gradient-to-r from-red-400 via-yellow-300 to-green-400 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_30%,white_0,transparent_40%),radial-gradient(circle_at_80%_70%,white_0,transparent_40%)]" />
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm/relaxed">
                <Badge text="AI Detection" />
                <Badge text="24/7 Chat" />
                <Badge text="Parent Coaching" />
              </div>
            </div>
          </div>
        </section>

        <section id="trust" className="mt-14 grid md:grid-cols-3 gap-6">
          <TrustCard
            icon={<ShieldCheck className="text-emerald-300" />}
            title="NIMHANS validated"
          />
          <TrustCard
            icon={<Users className="text-blue-200" />}
            title="50K+ users"
          />
          <TrustCard
            icon={<Star className="text-yellow-300" />}
            title="4.8/5 rating"
          />
        </section>

        <section id="testimonials" className="mt-14">
          <h2 className="text-2xl font-bold">
            "3 Lives Saved, 10,000+ Helped"
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Testimonial
              name="Arjun"
              quote="MITRA understood when nobody else did"
              before="2.8"
              after="8.9"
            />
            <Testimonial
              name="Sara"
              quote="Felt seen and safe"
              before="3.5"
              after="7.6"
            />
            <Testimonial
              name="Kabir"
              quote="Got my life back on track"
              before="4.1"
              after="8.2"
            />
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-sm/relaxed text-white/80">
        © {new Date().getFullYear()} MITRA. For crisis, call 9820466726.
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl bg-white/10 border border-white/20">
      <div className="text-white/70 text-xs">{label}</div>
      <div className="text-white font-semibold">{value}</div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="px-3 py-1 rounded-full bg-white/10 text-white/90 border white/20 text-xs inline-flex items-center gap-2">
      <CheckCircle className="size-3" /> {text}
    </div>
  );
}

function TrustCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="rounded-2xl backdrop-blur bg-white/10 p-5 border border-white/20 shadow-xl flex items-center gap-3">
      <div className="size-10 grid place-items-center rounded-full bg-white/10">
        {icon}
      </div>
      <div className="font-medium">{title}</div>
    </div>
  );
}

function Testimonial({
  name,
  quote,
  before,
  after,
}: {
  name: string;
  quote: string;
  before: string;
  after: string;
}) {
  return (
    <div className="rounded-2xl backdrop-blur bg-white/10 p-5 border border-white/20 shadow-xl">
      <div className="text-sm/relaxed">{name}'s Journey</div>
      <div className="mt-1 text white/90">“{quote}”</div>
      <div className="mt-3 text-xs text-white/70">
        Before: {before} • After: {after}
      </div>
    </div>
  );
}
