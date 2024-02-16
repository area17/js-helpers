export default sendEventToSegmentio;
/**
 * sendEventToSegmentio : Tracks site wide requests for analytics events. Catches events before segment.io is ready, stores them and tries them again when it is ready.
*/
declare function sendEventToSegmentio(): void;
