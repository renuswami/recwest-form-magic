import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact RecWest Outdoor Products" },
      {
        name: "description",
        content:
          "Get in touch with RecWest Outdoor Products for inquiries or project requests.",
      },
    ],
  }),
});

type RequestType = "" | "Inquiry" | "Project";

interface FormState {
  // page 1
  firstName: string;
  lastName: string;
  org: string;
  email: string;
  phone: string;
  // page 2 - shared
  requestType: RequestType;
  // inquiry
  inquiryType: string;
  inquiryProductLine: string;
  followUp: string;
  message: string;
  optIn: boolean;
  inquiryCaptcha: boolean;
  // project p2
  projectName: string;
  productLine: string;
  city: string;
  county: string;
  zip: string;
  // project p3
  projectTypes: string[];
  projectStart: string;
  budget: string;
  description: string;
  projectCaptcha: boolean;
}

const initialState: FormState = {
  firstName: "",
  lastName: "",
  org: "",
  email: "",
  phone: "",
  requestType: "",
  inquiryType: "",
  inquiryProductLine: "",
  followUp: "",
  message: "",
  optIn: false,
  inquiryCaptcha: false,
  projectName: "",
  productLine: "",
  city: "",
  county: "",
  zip: "",
  projectTypes: [],
  projectStart: "",
  budget: "",
  description: "",
  projectCaptcha: false,
};

const PROJECT_TYPES = [
  "Playground",
  "Fabric Shade",
  "Site Furnishings",
  "Surfacing",
  "Steel Shelter",
  "Parts",
  "Service Only",
];

const PRODUCT_LINES = [
  "Playground",
  "Fabric Shade",
  "Site Furnishings",
  "Surfacing",
  "Steel Shelter",
  "Parts",
  "Service Only",
  "Not Sure",
];

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-primary mb-1.5">
      {children}
      {required && <span>*</span>}
    </label>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <Label required={required}>{label}</Label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition";

const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed";

const btnSecondary =
  "inline-flex items-center justify-center rounded-full bg-accent/80 px-5 py-2 text-sm font-semibold text-accent-foreground shadow-sm hover:brightness-95 transition";

function Logo() {
  return (
    <div className="flex items-start gap-2">
      <div className="leading-none">
        <div
          className="font-serif italic text-4xl tracking-tight"
          style={{ color: "oklch(0.6 0.21 28)" }}
        >
          Rec<span className="font-bold not-italic">West</span>
        </div>
        <div className="text-[9px] tracking-[0.25em] text-muted-foreground mt-0.5">
          OUTDOOR PRODUCTS INC
        </div>
      </div>
    </div>
  );
}

function CaptchaBox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="my-4 flex items-center justify-between rounded border border-input bg-[#f9f9f9] px-4 py-3 max-w-xs">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5"
        />
        <span className="text-sm text-foreground">I'm not a robot</span>
      </label>
      <div className="text-[9px] text-muted-foreground text-center leading-tight">
        <div className="font-semibold">reCAPTCHA</div>
        <div>Privacy - Terms</div>
      </div>
    </div>
  );
}

function StepIndicator({
  current,
  total,
  label,
}: {
  current: number;
  total: number | null;
  label: string;
}) {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        Step {current}
        {total ? ` of ${total}` : ""}
      </div>
      <div className="text-sm font-semibold text-primary mt-0.5">{label}</div>
      <div className="mt-2 flex gap-1.5">
        {Array.from({ length: total ?? 1 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i + 1 <= current ? "bg-accent" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ContactInfo() {
  return (
    <div className="text-sm text-foreground">
      <h3 className="font-bold text-primary mb-3">Our Location</h3>
      <p className="font-semibold">RecWest Outdoor Products</p>
      <p className="text-muted-foreground">31324 Via Colinas Unit 102</p>
      <p className="text-muted-foreground">Westlake Village, CA 91362</p>

      <p className="mt-4 flex items-center gap-2">
        <Phone className="h-4 w-4 text-muted-foreground" />
        <span>818.735.3838</span>
      </p>

      <p className="mt-3 flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <a href="mailto:info@recwest.com" className="text-accent hover:underline">
          info@recwest.com
        </a>
      </p>

      <h3 className="font-bold text-primary mt-6 mb-3">Connect</h3>
      <div className="flex gap-2">
        {[
          { Icon: Facebook, bg: "#3b5998" },
          { Icon: XIcon, bg: "#000000" },
          { Icon: Instagram, bg: "#e1306c" },
          { Icon: Linkedin, bg: "#0077b5" },
          { Icon: Youtube, bg: "#c4302b" },
        ].map(({ Icon, bg }, i) => (
          <button
            key={i}
            type="button"
            className="h-8 w-8 rounded-full flex items-center justify-center text-white hover:opacity-90 transition"
            style={{ backgroundColor: bg }}
            aria-label="social"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function ContactPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<null | "Inquiry" | "Project">(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => {
      if (!e[k as string]) return e;
      const { [k as string]: _, ...rest } = e;
      return rest;
    });
  };

  const toggleProjectType = (t: string) => {
    setForm((f) => ({
      ...f,
      projectTypes: f.projectTypes.includes(t)
        ? f.projectTypes.filter((x) => x !== t)
        : [...f.projectTypes, t],
    }));
    setErrors((e) => {
      const { projectTypes: _, ...rest } = e;
      return rest;
    });
  };

  const validatePage1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "This field is required.";
    if (!form.lastName.trim()) e.lastName = "This field is required.";
    if (!form.org.trim()) e.org = "This field is required.";
    if (!form.email.trim()) e.email = "This field is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateInquiry = () => {
    const e: Record<string, string> = {};
    if (!form.inquiryType) e.inquiryType = "Please select an inquiry type.";
    if (!form.message.trim()) e.message = "This field is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateProjectInfo = () => {
    const e: Record<string, string> = {};
    if (!form.productLine) e.productLine = "Please select a product line.";
    if (!form.city.trim()) e.city = "This field is required.";
    if (!form.zip.trim()) e.zip = "This field is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateProjectDetails = () => {
    const e: Record<string, string> = {};
    if (form.projectTypes.length === 0)
      e.projectTypes = "Please select at least one project type.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const resetAll = () => {
    setForm(initialState);
    setErrors({});
    setStep(1);
    setSubmitted(null);
  };

  const totalSteps =
    form.requestType === "Inquiry" ? 2 : form.requestType === "Project" ? 3 : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Logo />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Page title */}
        <div className="text-center mb-10">
          <p className="text-sm font-bold tracking-[0.2em] text-primary mb-12">
            CONTACT
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-primary tracking-tight">
            Contact RecWest Outdoor Products
          </h1>
          <div className="mx-auto mt-6 h-px w-32 bg-primary/40" />
        </div>

        {submitted ? (
          <SuccessView type={submitted} onReset={resetAll} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 max-w-4xl mx-auto">
            <ContactInfo />

            <div>
              <StepIndicator
                current={step}
                total={totalSteps}
                label={
                  step === 1
                    ? "Contact Information"
                    : step === 2
                      ? form.requestType === "Inquiry"
                        ? "Inquiry Details"
                        : form.requestType === "Project"
                          ? "Project Information"
                          : "How can we help?"
                      : "Project Details"
                }
              />

              {step === 1 && (
                <Page1
                  form={form}
                  errors={errors}
                  update={update}
                  onNext={() => validatePage1() && setStep(2)}
                />
              )}

              {step === 2 && (
                <Page2
                  form={form}
                  errors={errors}
                  update={update}
                  onBack={() => setStep(1)}
                  onSubmitInquiry={() => {
                    if (validateInquiry()) setSubmitted("Inquiry");
                  }}
                  onNextProject={() => {
                    if (validateProjectInfo()) setStep(3);
                  }}
                />
              )}

              {step === 3 && (
                <Page3
                  form={form}
                  errors={errors}
                  update={update}
                  toggleProjectType={toggleProjectType}
                  onBack={() => setStep(2)}
                  onSubmit={() => {
                    if (validateProjectDetails()) setSubmitted("Project");
                  }}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Page1({
  form,
  errors,
  update,
  onNext,
}: {
  form: FormState;
  errors: Record<string, string>;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">
        Let's build something great together
      </h2>

      <Field label="First Name" required error={errors.firstName}>
        <input
          className={inputCls}
          value={form.firstName}
          onChange={(e) => update("firstName", e.target.value)}
        />
      </Field>
      <Field label="Last Name" required error={errors.lastName}>
        <input
          className={inputCls}
          value={form.lastName}
          onChange={(e) => update("lastName", e.target.value)}
        />
      </Field>
      <Field label="Organization Name" required error={errors.org}>
        <input
          className={inputCls}
          value={form.org}
          onChange={(e) => update("org", e.target.value)}
        />
      </Field>
      <Field label="Email" required error={errors.email}>
        <input
          type="email"
          className={inputCls}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </Field>
      <Field label="Phone">
        <input
          className={inputCls}
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </Field>

      <div className="mt-6">
        <button type="button" className={btnPrimary} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function Page2({
  form,
  errors,
  update,
  onBack,
  onSubmitInquiry,
  onNextProject,
}: {
  form: FormState;
  errors: Record<string, string>;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onBack: () => void;
  onSubmitInquiry: () => void;
  onNextProject: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-2">How can we help?</h2>

      <Field label="Request Type" required error={errors.requestType}>
        <select
          className={inputCls}
          value={form.requestType}
          onChange={(e) => update("requestType", e.target.value as RequestType)}
        >
          <option value="">Please select</option>
          <option value="Inquiry">Inquiry</option>
          <option value="Project">Project</option>
        </select>
        <p className="mt-2 text-xs text-muted-foreground">
          Choose "Inquiry" for product interest, CEU requests, virtual classroom
          requests, general questions, or non-project requests. Choose "Project"
          if you are ready to discuss a specific project.
        </p>
      </Field>

      {form.requestType === "Inquiry" && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-lg font-bold text-primary mb-4">Inquiry Details</h3>

          <Field label="Inquiry Type" required error={errors.inquiryType}>
            <select
              className={inputCls}
              value={form.inquiryType}
              onChange={(e) => update("inquiryType", e.target.value)}
            >
              <option value="">Please select</option>
              {[
                "Product Interest",
                "CEU Request",
                "Virtual Classroom Request",
                "General Question",
                "Parts / Service",
                "Other",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>

          <Field label="Product Line">
            <select
              className={inputCls}
              value={form.inquiryProductLine}
              onChange={(e) => update("inquiryProductLine", e.target.value)}
            >
              <option value="">Please select</option>
              {PRODUCT_LINES.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>

          <Field label="Preferred Follow-Up Method">
            <select
              className={inputCls}
              value={form.followUp}
              onChange={(e) => update("followUp", e.target.value)}
            >
              <option value="">Please select</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Either</option>
            </select>
          </Field>

          <Field label="Message / Details" required error={errors.message}>
            <textarea
              className={inputCls}
              rows={4}
              placeholder="Tell us what you're looking for, what product you're interested in, or how we can help."
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </Field>

          <label className="flex items-start gap-2 text-sm text-foreground mt-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.optIn}
              onChange={(e) => update("optIn", e.target.checked)}
            />
            <span>
              I would like to receive product updates and educational resources.
            </span>
          </label>

          <CaptchaBox
            checked={form.inquiryCaptcha}
            onChange={(v) => update("inquiryCaptcha", v)}
          />

          <div className="mt-6 flex items-center justify-between">
            <button type="button" className={btnSecondary} onClick={onBack}>
              Back
            </button>
            <button type="button" className={btnPrimary} onClick={onSubmitInquiry}>
              Submit
            </button>
          </div>
        </div>
      )}

      {form.requestType === "Project" && (
        <div className="mt-8 border-t border-border pt-6">
          <h3 className="text-lg font-bold text-primary mb-4">
            Project Information
          </h3>

          <Field label="Project Name">
            <input
              className={inputCls}
              value={form.projectName}
              onChange={(e) => update("projectName", e.target.value)}
            />
          </Field>
          <Field label="Product Line" required error={errors.productLine}>
            <select
              className={inputCls}
              value={form.productLine}
              onChange={(e) => update("productLine", e.target.value)}
            >
              <option value="">--None--</option>
              {PRODUCT_LINES.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="City" required error={errors.city}>
            <input
              className={inputCls}
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </Field>
          <Field label="County">
            <input
              className={inputCls}
              value={form.county}
              onChange={(e) => update("county", e.target.value)}
            />
          </Field>
          <Field label="Zip" required error={errors.zip}>
            <input
              className={inputCls}
              value={form.zip}
              onChange={(e) => update("zip", e.target.value)}
            />
          </Field>

          <div className="mt-6 flex items-center justify-between">
            <button type="button" className={btnSecondary} onClick={onBack}>
              Back
            </button>
            <button type="button" className={btnPrimary} onClick={onNextProject}>
              Next
            </button>
          </div>
        </div>
      )}

      {form.requestType === "" && (
        <div className="mt-6 flex items-center justify-between">
          <button type="button" className={btnSecondary} onClick={onBack}>
            Back
          </button>
          <button type="button" className={btnPrimary} disabled>
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

function Page3({
  form,
  errors,
  update,
  toggleProjectType,
  onBack,
  onSubmit,
}: {
  form: FormState;
  errors: Record<string, string>;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  toggleProjectType: (t: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">
        What's your Project About
      </h2>

      <Label required>Project Type</Label>
      <div className="space-y-2 mt-1">
        {PROJECT_TYPES.map((t) => {
          const checked = form.projectTypes.includes(t);
          return (
            <label
              key={t}
              className="flex items-center gap-3 rounded-md border border-input bg-white px-3 py-2.5 cursor-pointer hover:border-accent transition"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleProjectType(t)}
              />
              <span className="text-sm text-primary">{t}</span>
            </label>
          );
        })}
      </div>
      {errors.projectTypes && (
        <p className="mt-2 text-xs text-destructive">{errors.projectTypes}</p>
      )}

      <div className="mt-5">
        <Field label="Project Start">
          <input
            type="date"
            className={inputCls}
            value={form.projectStart}
            onChange={(e) => update("projectStart", e.target.value)}
          />
        </Field>
        <Field label="Budget">
          <input
            className={inputCls}
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          />
        </Field>
        <Field label="Description">
          <textarea
            className={inputCls}
            rows={4}
            placeholder="Tell us more about your project, timeline, goals, or any details that would help our team."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>
      </div>

      <CaptchaBox
        checked={form.projectCaptcha}
        onChange={(v) => update("projectCaptcha", v)}
      />

      <div className="mt-6 flex items-center justify-between">
        <button type="button" className={btnSecondary} onClick={onBack}>
          Back
        </button>
        <button type="button" className={btnPrimary} onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

function SuccessView({
  type,
  onReset,
}: {
  type: "Inquiry" | "Project";
  onReset: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto text-center py-10">
      <div className="mx-auto h-14 w-14 rounded-full bg-accent/15 flex items-center justify-center mb-5">
        <CheckCircle2 className="h-8 w-8 text-accent" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-3">
        {type === "Inquiry"
          ? "Thank you for your inquiry"
          : "Thank you for your project inquiry"}
      </h2>
      <p className="text-muted-foreground">
        {type === "Inquiry"
          ? "Your request has been submitted to RecWest Outdoor Products. A member of the team will follow up with you soon."
          : "Your project request has been submitted to RecWest Outdoor Products. A member of the team will review your information and follow up soon."}
      </p>
      <div className="mt-5 inline-block rounded-md bg-secondary px-4 py-2 text-sm">
        <span className="text-muted-foreground">Submission Type: </span>
        <span className="font-semibold text-primary">{type}</span>
      </div>
      <div className="mt-8">
        <button type="button" className={btnPrimary} onClick={onReset}>
          Start Over
        </button>
      </div>
    </div>
  );
}
