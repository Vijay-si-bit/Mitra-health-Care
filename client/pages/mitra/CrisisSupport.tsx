import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CrisisSupport() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-red-600 text-white p-4 text-center text-lg font-semibold">
        You're Not Alone - Help is Here
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Immediate help</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => alert("SOS sent to guardians and counselor")}
            >
              SOS - Tap if you need help NOW
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="tel:9820466726">Call 9820466726</a>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href="/app/student/chat">Connect to counselor (chat)</a>
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calming exercises</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-lg border p-4">
              <div className="font-medium">Breathing</div>
              <div className="mt-2 size-24 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-600/40 mx-auto animate-ping [animation-duration:3s]" />
              <div className="text-sm text-muted-foreground text-center">
                Inhale... hold... exhale...
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">5-4-3-2-1 Grounding</div>
              <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground space-y-1">
                <li>5 things you can see</li>
                <li>4 things you can touch</li>
                <li>3 things you can hear</li>
                <li>2 things you can smell</li>
                <li>1 thing you can taste</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Guided meditation</div>
              <audio controls className="mt-2 w-full">
                <source src="/audio/meditation.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <div className="rounded-lg border p-4">
              <div className="font-medium">Calming images</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-md bg-blue-100"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Safety plan</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <div className="font-medium mb-1">Warning signs</div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Can't sleep</li>
                <li>Skipping meals</li>
                <li>Withdrawing from friends</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1">Coping strategies</div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Call a friend</li>
                <li>Go for a walk</li>
                <li>Breathing exercises</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1">Support contacts</div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Parent</li>
                <li>Best friend</li>
                <li>Counselor</li>
              </ul>
            </div>
            <div>
              <div className="font-medium mb-1">Safe environment tips</div>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Remove triggers</li>
                <li>Keep room lit</li>
                <li>Play soothing music</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="text-center text-sm text-muted-foreground">
        Remember: This feeling is temporary. You are valued. You matter.
      </div>
    </div>
  );
}
