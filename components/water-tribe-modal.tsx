"use client"

import { useState, useId } from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/dialog"
import { Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FormValues {
  firstName: string
  email: string
  instagram: string
  referredBy: string
}

type FormState = "idle" | "submitting" | "success" | "error"

const EMPTY: FormValues = { firstName: "", email: "", instagram: "", referredBy: "" }

function validate(v: FormValues): Partial<Record<keyof FormValues, string>> {
  const e: Partial<Record<keyof FormValues, string>> = {}
  if (!v.firstName.trim()) e.firstName = "Required"
  if (!v.email.trim()) e.email = "Required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email"
  if (!v.instagram.trim()) e.instagram = "Required"
  if (!v.referredBy.trim()) e.referredBy = "Required"
  return e
}

interface FieldProps {
  id: string
  label: string
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  error?: string
  autoComplete?: string
}

function Field({ id, label, type = "text", placeholder, value, onChange, disabled, error, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        className={cn(
          "w-full rounded-xl border bg-white/10 px-4 py-3 text-[15px] text-white",
          "placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/40",
          "transition-all disabled:opacity-50",
          error ? "border-red-400/70" : "border-white/20",
        )}
      />
      {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
    </div>
  )
}

export function WaterTribeModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (o: boolean) => void
}) {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [formState, setFormState] = useState<FormState>("idle")
  const [submitError, setSubmitError] = useState("")
  const uid = useId()

  const id = (k: string) => `${uid}-${k}`

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [k]: e.target.value }))

  const handleOpenChange = (o: boolean) => {
    if (formState === "submitting") return
    onOpenChange(o)
    if (!o) {
      // Delay reset to let close animation finish
      setTimeout(() => {
        setErrors({})
        setSubmitError("")
        setFormState("idle")
        // On success, clear the form; on error, keep values so user doesn't retype
        if (formState !== "error") setValues(EMPTY)
      }, 200)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(values)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitError("")
    setFormState("submitting")

    try {
      const res = await fetch("/api/water-tribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          email: values.email.trim(),
          instagram: values.instagram.trim().replace(/^@/, ""),
          referredBy: values.referredBy.trim(),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setFormState("success")
      } else {
        setFormState("error")
        setSubmitError("Something went wrong — please try again.")
      }
    } catch {
      setFormState("error")
      setSubmitError("Something went wrong — please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-sky-950/60 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl",
            "px-6 py-8 shadow-2xl shadow-sky-950/60",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-200",
          )}
        >
          {/* Close button */}
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-full p-1.5",
              "text-white/50 hover:text-white/90 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-white/30",
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Shell icon */}
          <div className="flex justify-center mb-5">
            <div
              aria-hidden
              style={{
                height: 40,
                width: 40,
                background: "rgba(255,255,255,0.85)",
                maskImage: 'url("/wtmb.png")',
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
                WebkitMaskImage: 'url("/wtmb.png")',
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
              }}
            />
          </div>

          <DialogPrimitive.Title className="text-center text-white font-semibold text-[17px] leading-snug mb-1">
            Access Water Tribe Mission
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="text-center text-white/55 text-sm mb-6 leading-relaxed">
            Join us — build something beautiful.
          </DialogPrimitive.Description>

          {formState === "success" ? (
            <div className="flex flex-col items-center gap-5 py-2">
              <p className="text-white text-center text-[15px] leading-relaxed">
                You're in. ✨<br />
                Check your inbox for the Blueprint.
              </p>
              <DialogPrimitive.Close
                className={cn(
                  "rounded-full border border-white/25 bg-white/15 px-7 py-2.5",
                  "text-sm font-medium text-white hover:bg-white/25 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-white/30",
                )}
              >
                Close
              </DialogPrimitive.Close>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
              <Field
                id={id("firstName")}
                label="First Name"
                placeholder="First Name"
                value={values.firstName}
                onChange={set("firstName")}
                disabled={formState === "submitting"}
                autoComplete="given-name"
                error={errors.firstName}
              />
              <Field
                id={id("email")}
                label="Email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={set("email")}
                disabled={formState === "submitting"}
                autoComplete="email"
                error={errors.email}
              />
              <Field
                id={id("instagram")}
                label="Instagram"
                placeholder="Instagram (@handle)"
                value={values.instagram}
                onChange={set("instagram")}
                disabled={formState === "submitting"}
                autoComplete="off"
                error={errors.instagram}
              />
              <Field
                id={id("referredBy")}
                label="Referred By"
                placeholder="Referred By"
                value={values.referredBy}
                onChange={set("referredBy")}
                disabled={formState === "submitting"}
                autoComplete="off"
                error={errors.referredBy}
              />

              {formState === "error" && (
                <p className="text-sm text-red-300 text-center -mb-1">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className={cn(
                  "mt-1 flex w-full items-center justify-center gap-2 rounded-xl",
                  "bg-sky-500 px-4 py-3 text-[15px] font-semibold text-white shadow-lg",
                  "hover:bg-sky-400 transition-colors",
                  "disabled:cursor-not-allowed disabled:opacity-70",
                  "focus:outline-none focus:ring-2 focus:ring-sky-300",
                )}
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  "Join the Mission"
                )}
              </button>
            </form>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}
