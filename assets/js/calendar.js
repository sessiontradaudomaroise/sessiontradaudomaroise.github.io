<script>
function downloadICS(summary, start, end, description, location) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startFormatted = startDate.toISOString().replace(/[-:]/g, '').replace('Z', '');
  const endFormatted = endDate.toISOString().replace(/[-:]/g, '').replace('Z', '');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startFormatted}
DTEND:${endFormatted}
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${summary}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.download-ics').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const summary = button.dataset.summary;
      const start = button.dataset.start;
      const end = button.dataset.end;
      const description = button.dataset.description;
      const location = button.dataset.location;

      downloadICS(summary, start, end, description, location);
    });
  });
});
</script>