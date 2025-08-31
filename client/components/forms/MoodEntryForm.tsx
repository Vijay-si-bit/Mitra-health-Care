import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { moodEntrySchema, type MoodEntryFormData } from "@/lib/validators";
import { MOOD_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MoodEntryFormProps {
  onSubmit: (data: MoodEntryFormData) => void;
  loading?: boolean;
}

const MOOD_FACTORS = [
  "School stress", "Family issues", "Social problems", "Sleep issues",
  "Physical health", "Academic pressure", "Bullying", "Loneliness",
  "Anxiety", "Depression", "Other"
];

export default function MoodEntryForm({ onSubmit, loading }: MoodEntryFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<MoodEntryFormData>({
    resolver: zodResolver(moodEntrySchema),
    defaultValues: {
      mood: 3,
      notes: "",
      factors: []
    }
  });

  const selectedMood = watch("mood");
  const selectedFactors = watch("factors") || [];

  const toggleFactor = (factor: string) => {
    const current = selectedFactors;
    const updated = current.includes(factor)
      ? current.filter(f => f !== factor)
      : [...current, factor];
    setValue("factors", updated);
  };

  const selectedMoodOption = MOOD_OPTIONS.find(option => option.value === selectedMood);

  return (
    <Card>
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Mood Selection */}
          <div className="space-y-3">
            <Label>Select your mood</Label>
            <div className="grid grid-cols-5 gap-2">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue("mood", option.value)}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-lg border-2 transition-all",
                    selectedMood === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <span className="text-2xl mb-1">{option.emoji}</span>
                  <span className="text-xs text-center">{option.label}</span>
                </button>
              ))}
            </div>
            {selectedMoodOption && (
              <div className="text-center p-3 bg-muted rounded-lg">
                <span className="text-3xl">{selectedMoodOption.emoji}</span>
                <p className="font-medium mt-1">{selectedMoodOption.label}</p>
              </div>
            )}
            {errors.mood && (
              <p className="text-sm text-destructive">{errors.mood.message}</p>
            )}
          </div>

          {/* Contributing Factors */}
          <div className="space-y-3">
            <Label>What might be affecting your mood? (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {MOOD_FACTORS.map((factor) => (
                <Badge
                  key={factor}
                  variant={selectedFactors.includes(factor) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleFactor(factor)}
                >
                  {factor}
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Tell us more about how you're feeling..."
              {...register("notes")}
              rows={3}
            />
            {errors.notes && (
              <p className="text-sm text-destructive">{errors.notes.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Mood Entry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
