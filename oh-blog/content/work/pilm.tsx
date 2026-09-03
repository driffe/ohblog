import { Prose, H2, P, UL, LI } from "@/components/case-study/prose";
import { Figure } from "@/components/case-study/figure";
import { Callout } from "@/components/case-study/callout";
import { MetricRow } from "@/components/case-study/metric";
import { Toc } from "@/components/case-study/toc";
import { DiagramFrame, Box, Row, Arrow, Stack } from "@/components/case-study/diagram";

const toc = [
  { id: "context", label: "Context" },
  { id: "architecture", label: "Architecture" },
  { id: "shared-pipeline", label: "One pipeline, three surfaces" },
  { id: "presets", label: "Presets and LUTBaker" },
  { id: "capture-flow", label: "Capture, review, edit" },
  { id: "zoom-ux", label: "Zoom and manual controls" },
  { id: "privacy", label: "Privacy and status" },
];

export default function PilmBody() {
  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-16">
      <Prose>
        <H2 id="context">Context</H2>
        <P>
          Pilm is an iOS film-emulation camera app: Swift 5 and SwiftUI, targeting iOS 17+, 34 Swift files and
          4,509 lines of code, built with XcodeGen under bundle id <code>com.seyoungoh.pilm</code>, localized in
          Korean and English through a single <code>Localizable.xcstrings</code> catalog. It&rsquo;s live on
          the{" "}
          <a
            href="https://apps.apple.com/us/app/pilm-camera/id6781464671"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent break-words"
          >
            App Store
          </a>
          .
        </P>
        <P>
          The Xcode project file is generated, not merged: a checked-in <code>project.yml</code> drives XcodeGen
          rather than committing the Xcode project file directly, so the <code>.xcodeproj</code> is a build
          artifact, not something merged by hand. The codebase itself is organized by concern rather than by
          screen: a <code>Camera/</code> module owns the capture session, frame processing, and video recording;{" "}
          <code>Filters/</code> owns the preset library, the film-rendering engine, and LUT handling;{" "}
          <code>Views/</code> holds every screen from the live camera to the editor; and a small{" "}
          <code>Services/</code> module handles saving to Photos.
        </P>
        <div className="flex flex-wrap items-start gap-6 my-8">
          <Figure
            src="/work/pilm/frame-01.webp"
            alt="Pilm camera app, film preset frame"
            caption="One of the 35 film presets, applied live through the shared FilmEngine."
            className="my-0 flex-1 min-w-[240px]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/work/pilm/app-icon.webp"
            alt="Pilm app icon"
            className="w-24 h-24 border border-rule shrink-0"
          />
        </div>

        <H2 id="architecture">One sensor, two previews at once</H2>
        <P>
          Previewing 9:16 and 16:9 simultaneously from the same sensor is the whole point, and it&rsquo;s why the
          pipeline is one <code>AVCaptureSession</code> feeding a single <code>FrameProcessor</code> rather than
          two separate capture sessions — no second camera, no second session, just the same frame cropped two
          ways into two independent Metal (<code>MTKView</code>) previews rendered side by side.
        </P>
        <DiagramFrame>
          <Stack>
            <Box label="AVCaptureSession" sub="single sensor" />
            <Arrow direction="down" />
            <Box label="FrameProcessor" sub="crops one frame two ways" />
            <Arrow direction="down" />
            <Row>
              <Box label="MTKView — 16:9" sub="live preview" />
              <Box label="MTKView — 9:16" sub="live preview" />
            </Row>
            <Arrow direction="down" />
            <Box label="Shared CIContext + FilmEngine" sub="preview · review · editor" />
          </Stack>
        </DiagramFrame>

        <H2 id="shared-pipeline">One pipeline, three surfaces</H2>
        <P>
          What you see live has to be what you get after you tap the shutter, and what you see in review has to
          be what you get after you save — the risk otherwise is a separate rendering path that quietly drifts
          out of sync with what was actually captured. That&rsquo;s why a single shared <code>CIContext</code>{" "}
          and <code>FilmEngine</code> instance is reused across the live preview, the post-capture review
          screen, and the editor: the same pixels run through the same pipeline in all three places.
        </P>
        <P>
          <code>VideoRecorder</code> extends the same idea to video: it records two filtered videos, 9:16 and
          16:9, with audio, at the same time, from the same session. Either aspect ratio can be switched off
          from a settings sheet — an off ratio is excluded from both preview and saving — with at least one
          kept active at all times, so there&rsquo;s always something to shoot.
        </P>
        <Figure
          src="/work/pilm/frame-03.webp"
          alt="Pilm camera app, second film preset frame"
          caption="A cooler-toned preset — presets are grouped into six mood categories."
        />

        <H2 id="presets">Presets and LUTBaker</H2>
        <P>
          Re-evaluating a preset&rsquo;s full parameter chain — saturation, contrast, color temperature, tone
          curve, grain, vignette — on every single preview frame is too expensive to keep the live preview fast.
          That&rsquo;s why <code>LUTBaker</code> bakes each preset&rsquo;s parameters down into a 3D LUT once
          instead: <code>CubeLUT</code> parses the resulting <code>.cube</code> file, and applying a baked LUT
          per frame is cheap where re-evaluating the full chain per frame wouldn&rsquo;t be. There are 35 film
          presets across 6 mood categories: Warm, Cool, Vivid, Soft, Cinematic, and B&amp;W.
        </P>
        <Figure
          src="/work/pilm/frame-05.webp"
          alt="Pilm camera app, third film preset frame"
          caption="A warmer preset — the live preview, review screen, and editor all render through the same LUT-baked pipeline."
        />

        <H2 id="capture-flow">Capture, review, edit</H2>
        <P>
          Shooting is a straight loop: tap the shutter, capture one full-resolution frame, and land on a review
          screen where the preset is confirmed before it&rsquo;s saved to the Photos library through the Photos
          framework, or discarded to go straight back to the live camera. Focus and exposure are handled without
          separate controls — a tap on the preview sets focus, and a vertical drag adjusts exposure (EV) from
          that point.
        </P>
        <P>
          Switching presets always resets the manual sliders back to that preset&rsquo;s own defaults rather
          than carrying prior adjustments over — deliberately, so a preset always starts from its own intended
          look instead of an unpredictable blend of two presets&rsquo; settings. The editor works on photos
          already in the library, not just fresh captures: pick one, apply a preset, then fine-tune it with
          manual sliders for exposure, contrast, saturation, temperature, and grain.
        </P>
        <Figure
          src="/work/pilm/frame-05.webp"
          alt="Pilm camera app, third film preset frame"
          caption="A warmer preset — the live preview, review screen, and editor all render through the same LUT-baked pipeline."
        />

        <H2 id="zoom-ux">Zoom and manual controls</H2>
        <P>
          Zoom is exposed as continuous magnification labels directly on the preset buttons rather than a
          separate slider — the active button shows the live multiplier (e.g. <code>1.5x</code>). Past 2×, an
          overflow button takes over and displays the current zoom level instead of trying to cram more preset
          buttons into the row. On devices with no ultrawide lens, the 0.5× option is auto-hidden rather than
          shown and left non-functional — a control that can&rsquo;t do anything on the current hardware simply
          isn&rsquo;t there.
        </P>
        <Figure
          src="/work/pilm/frame-07.webp"
          alt="Pilm camera app, fourth film preset frame"
          caption="A black-and-white preset, one of six mood categories the 35 presets are organized into."
        />

        <H2 id="privacy">Interface details and status</H2>
        <P>
          A few smaller decisions carry a lot of the day-to-day feel: a filmstrip-style preset picker lets you
          scrub through all 35 looks without leaving the camera, a &ldquo;Featured&rdquo; tab surfaces a curated
          subset instead of forcing a scroll through six full mood categories every time, and picking a photo
          from the library to edit goes through the same <code>PhotoPicker</code> flow the review screen uses
          for saving — one picker, both directions.
        </P>
        <MetricRow
          metrics={[
            { value: "35", label: "Film presets" },
            { value: "6", label: "Mood categories" },
            { value: "4,509", label: "Lines of code" },
            { value: "3.2K+", label: "App Store downloads" },
          ]}
        />
        <P>
          The app is fully on-device with no network calls at all, so its App Privacy label is simply &ldquo;Data
          Not Collected.&rdquo; Privacy and support pages are hosted at{" "}
          <a
            href="https://driffe.github.io/pilm-privacy/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-accent break-words"
          >
            driffe.github.io/pilm-privacy
          </a>
          .
        </P>
        <Callout label="Status">
          Live on the App Store, with 3.2K+ downloads so far. The first month alone brought 2,000+ downloads at a
          9.15% conversion rate — above the 75th percentile for the Photo &amp; Video category — with 27.78% Day-1
          retention.
        </Callout>
      </Prose>
      <Toc entries={toc} />
    </div>
  );
}
