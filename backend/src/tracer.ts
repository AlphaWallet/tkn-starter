import tracer from 'dd-trace';
tracer.init().use('http', {
  blocklist: ['/'], // ignore ELB health check from traces
});
export default tracer;
