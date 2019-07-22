<h1><a id="Radiologex_Whisper_POC_0"></a>Radiologex Whisper POC</h1>
<p>This POC is made using whisper ethereum.</p>
<ul>
<li>It’s connected to our ethereum private network which is running whisper protocol.</li>
</ul>
<h1><a id="How_To_Use_7"></a>How To Use?</h1>
<ul>
<li>You can open index.html file in more that 1 tab browser.</li>
<li>You just need to type the message in the input form.</li>
<li>You can either input the “destination address” field or just leave it blank.</li>
<li>If you leave it blank, your message would be sent to public (every users that accesses index.html).</li>
<li>You need to fill the destination address if you want to send the message privately to the partiuclar address.</li>
</ul>
<p>Feature:</p>
<ul>
<li>If the message is sent publicly, then it will use symetric encryption (every users that have the symmetric key are able to access the message that being sent), otherwise it will use asymmetric encryption (only user that has the private key of destination address can access the message).</li>
<li>Basically, every message that gone through whisper will be encrypted.</li>
</ul>
