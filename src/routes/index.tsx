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
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [
      { title: "Contact & Event Registration | RecWest Outdoor Products" },
      {
        name: "description",
        content:
          "Contact RecWest Outdoor Products or register for RecWest events.",
      },
    ],
  }),
});

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
const EVENT_TYPES = ["CEUs", "RecWest Virtual Classroom", "Play Tours"];
const ATTENDEE_COUNT = ["1", "2", "3", "4", "5+", "Not sure yet"];

const inputCls =
  "w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition";
const btnPrimary =
  "inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed";
const btnSecondary =
  "inline-flex items-center justify-center rounded-full bg-accent/80 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition";
const tabBase =
  "rounded-full px-5 py-2.5 text-sm font-bold transition border";

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
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
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-start gap-2">
      <div className="leading-none">
        <div
          className="font-serif italic text-4xl tracking-tight text-brand-red"
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
        <span className="text-sm">I'm not a robot</span>
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
  total: number;
  label: string;
}) {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        Step {current} of {total}
      </div>
      <div className="text-sm font-semibold text-primary mt-0.5">{label}</div>
      <div className="mt-2 flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
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
  const socials = [
    { Icon: Facebook, bg: "#3b5998" },
    { Icon: Twitter, bg: "#000000" },
    { Icon: Instagram, bg: "#e1306c" },
    { Icon: Linkedin, bg: "#0077b5" },
    { Icon: Youtube, bg: "#c4302b" },
  ];
  return (
    <div className="text-sm">
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
        {socials.map(({ Icon, bg }, i) => (
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

const emptyContactForm = {
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
  projectTypes: [] as string[],
  projectStart: "",
  budget: "",
  description: "",
  projectCaptcha: false,
};

const emptyEventForm = {
  firstName: "",
  lastName: "",
  org: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  attendeeCount: "",
  attendeeNames: "",
  eventMessage: "",
  eventCaptcha: false,
};

type ContactForm = typeof emptyContactForm;
type EventForm = typeof emptyEventForm;
type Errors = Record<string, string>;

function App() {
  const [activeForm, setActiveForm] = useState<"contact" | "event">("contact");
  const [contactStep, setContactStep] = useState(1);
  const [eventStep, setEventStep] = useState(1);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [eventForm, setEventForm] = useState<EventForm>(emptyEventForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

  const clearFieldError = (field: string) => {
    setErrors((e) => {
      if (!e[field]) return e;
      const { [field]: _, ...rest } = e;
      return rest;
    });
  };

  const updateContact = (k: string, v: any) => {
    setContactForm((f) => ({ ...f, [k]: v }));
    clearFieldError(k);
  };

  const updateEvent = (k: string, v: any) => {
    setEventForm((f) => ({ ...f, [k]: v }));
    clearFieldError(k);
  };

  const switchForm = (formType: "contact" | "event") => {
    setActiveForm(formType);
    setErrors({});
    setSubmitted(null);
  };

  const resetAll = () => {
    setContactForm(emptyContactForm);
    setEventForm(emptyEventForm);
    setContactStep(1);
    setEventStep(1);
    setErrors({});
    setSubmitted(null);
  };

  const toggleProjectType = (type: string) => {
    setContactForm((f) => ({
      ...f,
      projectTypes: f.projectTypes.includes(type)
        ? f.projectTypes.filter((x) => x !== type)
        : [...f.projectTypes, type],
    }));
    clearFieldError("projectTypes");
  };

  const validateBaseContact = (form: { firstName: string; lastName: string; org: string; email: string }) => {
    const e: Errors = {};
    if (!form.firstName.trim()) e.firstName = "This field is required.";
    if (!form.lastName.trim()) e.lastName = "This field is required.";
    if (!form.org.trim()) e.org = "This field is required.";
    if (!form.email.trim()) e.email = "This field is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateContactRequestType = () => {
    const e: Errors = {};
    if (!contactForm.requestType) e.requestType = "Please select a request type.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateInquiry = () => {
    const e: Errors = {};
    if (!contactForm.inquiryType) e.inquiryType = "Please select an inquiry type.";
    if (!contactForm.message.trim()) e.message = "This field is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateProjectInfo = () => {
    const e: Errors = {};
    if (!contactForm.productLine) e.productLine = "Please select a product line.";
    if (!contactForm.city.trim()) e.city = "This field is required.";
    if (!contactForm.zip.trim()) e.zip = "This field is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateProjectDetails = () => {
    const e: Errors = {};
    if (contactForm.projectTypes.length === 0)
      e.projectTypes = "Please select at least one project type.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateEventDetails = () => {
    const e: Errors = {};
    if (!eventForm.eventType) e.eventType = "Please select an event type.";
    if (!eventForm.eventMessage.trim())
      e.eventMessage = "This field is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const contactTotalSteps = contactForm.requestType === "Project" ? 4 : 3;
  const contactStepLabel =
    contactStep === 1
      ? "Contact Information"
      : contactStep === 2
        ? "Contact Request Type"
        : contactStep === 3 && contactForm.requestType === "Project"
          ? "Project Information"
          : contactStep === 4
            ? "Project Details"
            : "Inquiry Details";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Logo />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-bold tracking-[0.2em] text-primary mb-8">
            CONTACT
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase text-primary tracking-tight">
            Contact RecWest Outdoor Products
          </h1>
          <div className="mx-auto mt-6 h-px w-32 bg-primary/40" />
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              className={`${tabBase} ${
                activeForm === "contact"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-border hover:border-primary"
              }`}
              onClick={() => switchForm("contact")}
            >
              Contact Us Form
            </button>
            <button
              type="button"
              className={`${tabBase} ${
                activeForm === "event"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-primary border-border hover:border-primary"
              }`}
              onClick={() => switchForm("event")}
            >
              Event Registration Form
            </button>
          </div>
        </div>

        {submitted ? (
          <SuccessView type={submitted} onReset={resetAll} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 max-w-4xl mx-auto">
            <ContactInfo />
            <div>
              {activeForm === "contact" ? (
                <>
                  <StepIndicator
                    current={contactStep}
                    total={contactTotalSteps}
                    label={contactStepLabel}
                  />
                  {contactStep === 1 && (
                    <ContactBaseFields
                      title="Let's build something great together"
                      form={contactForm}
                      errors={errors}
                      update={updateContact}
                      onNext={() =>
                        validateBaseContact(contactForm) && setContactStep(2)
                      }
                    />
                  )}
                  {contactStep === 2 && (
                    <ContactRequestType
                      form={contactForm}
                      errors={errors}
                      update={updateContact}
                      onBack={() => setContactStep(1)}
                      onNext={() =>
                        validateContactRequestType() && setContactStep(3)
                      }
                    />
                  )}
                  {contactStep === 3 && contactForm.requestType === "Inquiry" && (
                    <InquiryDetails
                      form={contactForm}
                      errors={errors}
                      update={updateContact}
                      onBack={() => setContactStep(2)}
                      onSubmit={() => {
                        if (validateInquiry()) setSubmitted("Contact Inquiry");
                      }}
                    />
                  )}
                  {contactStep === 3 && contactForm.requestType === "Project" && (
                    <ProjectInfo
                      form={contactForm}
                      errors={errors}
                      update={updateContact}
                      onBack={() => setContactStep(2)}
                      onNext={() => {
                        if (validateProjectInfo()) setContactStep(4);
                      }}
                    />
                  )}
                  {contactStep === 4 && contactForm.requestType === "Project" && (
                    <ProjectDetails
                      form={contactForm}
                      errors={errors}
                      update={updateContact}
                      toggleProjectType={toggleProjectType}
                      onBack={() => setContactStep(3)}
                      onSubmit={() => {
                        if (validateProjectDetails()) setSubmitted("Project Request");
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <StepIndicator
                    current={eventStep}
                    total={2}
                    label={
                      eventStep === 1
                        ? "Registrant Information"
                        : "Event Registration Details"
                    }
                  />
                  {eventStep === 1 && (
                    <ContactBaseFields
                      title="Register for a RecWest event"
                      form={eventForm}
                      errors={errors}
                      update={updateEvent}
                      onNext={() =>
                        validateBaseContact(eventForm) && setEventStep(2)
                      }
                    />
                  )}
                  {eventStep === 2 && (
                    <EventRegistration
                      form={eventForm}
                      errors={errors}
                      update={updateEvent}
                      onBack={() => setEventStep(1)}
                      onSubmit={() => {
                        if (validateEventDetails())
                          setSubmitted("Event Registration");
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ContactBaseFields({
  title,
  form,
  errors,
  update,
  onNext,
}: {
  title: string;
  form: any;
  errors: Errors;
  update: (k: string, v: any) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">{title}</h2>
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

function ContactRequestType({
  form,
  errors,
  update,
  onBack,
  onNext,
}: {
  form: ContactForm;
  errors: Errors;
  update: (k: string, v: any) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-2">
        What do you need help with?
      </h2>
      <Field label="Request Type" required error={errors.requestType}>
        <select
          className={inputCls}
          value={form.requestType}
          onChange={(e) => update("requestType", e.target.value)}
        >
          <option value="">Please select</option>
          <option value="Inquiry">Inquiry</option>
          <option value="Project">Project</option>
        </select>
        <p className="mt-2 text-xs text-muted-foreground">
          Use this Contact Us form for general inquiries and project requests.
          Event registration is handled separately from the Event Registration tab.
        </p>
      </Field>
      <div className="mt-6 flex items-center justify-between">
        <button type="button" className={btnSecondary} onClick={onBack}>
          Back
        </button>
        <button type="button" className={btnPrimary} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function InquiryDetails({
  form,
  errors,
  update,
  onBack,
  onSubmit,
}: {
  form: ContactForm;
  errors: Errors;
  update: (k: string, v: any) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Inquiry Details</h2>
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
      <label className="flex items-start gap-2 text-sm mt-2">
        <input
          type="checkbox"
          className="mt-1"
          checked={form.optIn}
          onChange={(e) => update("optIn", e.target.checked)}
        />
        <span>I would like to receive product updates and educational resources.</span>
      </label>
      <CaptchaBox
        checked={form.inquiryCaptcha}
        onChange={(v) => update("inquiryCaptcha", v)}
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

function ProjectInfo({
  form,
  errors,
  update,
  onBack,
  onNext,
}: {
  form: ContactForm;
  errors: Errors;
  update: (k: string, v: any) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Project Information</h2>
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
        <button type="button" className={btnPrimary} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

function ProjectDetails({
  form,
  errors,
  update,
  toggleProjectType,
  onBack,
  onSubmit,
}: {
  form: ContactForm;
  errors: Errors;
  update: (k: string, v: any) => void;
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
        {PROJECT_TYPES.map((type) => {
          const checked = form.projectTypes.includes(type);
          return (
            <label
              key={type}
              className="flex items-center gap-3 rounded-md border border-input bg-white px-3 py-2.5 cursor-pointer hover:border-accent transition"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleProjectType(type)}
              />
              <span className="text-sm text-primary">{type}</span>
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

function EventRegistration({
  form,
  errors,
  update,
  onBack,
  onSubmit,
}: {
  form: EventForm;
  errors: Errors;
  update: (k: string, v: any) => void;
  onBack: () => void;
  onSubmit: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">
        Event Registration Details
      </h2>
      <Field label="Event Type" required error={errors.eventType}>
        <select
          className={inputCls}
          value={form.eventType}
          onChange={(e) => update("eventType", e.target.value)}
        >
          <option value="">Please select</option>
          {EVENT_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>
      <Field label="Preferred Event Date">
        <input
          type="date"
          className={inputCls}
          value={form.eventDate}
          onChange={(e) => update("eventDate", e.target.value)}
        />
      </Field>
      <Field label="Number of Attendees">
        <select
          className={inputCls}
          value={form.attendeeCount}
          onChange={(e) => update("attendeeCount", e.target.value)}
        >
          <option value="">Please select</option>
          {ATTENDEE_COUNT.map((count) => (
            <option key={count}>{count}</option>
          ))}
        </select>
      </Field>
      <Field label="Attendee Names">
        <textarea
          className={inputCls}
          rows={3}
          placeholder="Add attendee names, if available."
          value={form.attendeeNames}
          onChange={(e) => update("attendeeNames", e.target.value)}
        />
      </Field>
      <Field label="Message / Details" required error={errors.eventMessage}>
        <textarea
          className={inputCls}
          rows={4}
          placeholder="Tell us about the event, class, tour, or registration request."
          value={form.eventMessage}
          onChange={(e) => update("eventMessage", e.target.value)}
        />
      </Field>
      <CaptchaBox
        checked={form.eventCaptcha}
        onChange={(v) => update("eventCaptcha", v)}
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

function SuccessView({ type, onReset }: { type: string; onReset: () => void }) {
  const message =
    type === "Event Registration"
      ? "Your event registration has been submitted to RecWest Outdoor Products. A member of the team will contact you soon."
      : type === "Project Request"
        ? "Your project request has been submitted to RecWest Outdoor Products. A member of the team will review your information and follow up soon."
        : "Your contact request has been submitted to RecWest Outdoor Products. A member of the team will follow up with you soon.";

  return (
    <div className="max-w-xl mx-auto text-center py-10">
      <div className="mx-auto h-14 w-14 rounded-full bg-accent/15 flex items-center justify-center mb-5">
        <CheckCircle2 className="h-8 w-8 text-accent" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-3">
        {type === "Event Registration"
          ? "Thank you for registering"
          : type === "Project Request"
            ? "Thank you for your project inquiry"
            : "Thank you for contacting us"}
      </h2>
      <p className="text-muted-foreground">{message}</p>
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
