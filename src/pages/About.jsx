import { Link } from 'react-router-dom'
import { brand, contactLinks } from '../config/brand'
import { PageHero, Note, SectionHeading } from '../components/UI'
import Icon from '../components/Icon'

export default function About() {
  return (
    <>
      <PageHero
        title="আমাদের সম্পর্কে"
        desc="কৃষিপ্রহরী (KrishiProhori) — বাংলাদেশের কৃষকের জন্য ফসল সুরক্ষা, সার, বীজ ও কৃষি সহায়ক উপকরণের ফ্রন্টএন্ড ডেমো ই-কমার্স।"
        icon="leaf"
        crumbs={[{ label: 'আমাদের সম্পর্কে' }]}
      />

      <section className="section section--tight">
        <div className="container prose">
          <div className="prose__grid">
            <article>
              <h2>পরিচয়</h2>
              <p>
                এই ওয়েবসাইটটি বাংলাদেশের কৃষকদের জন্য দরকারী পণ্যের একটি ডিজিটাল প্রদর্শনী। আমরা ফসল সুরক্ষা,
                রাসায়নিক ও জৈব সার, মাইক্রোনিউট্রিয়েন্ট, বীজ, স্প্রেয়ার, সেচ ও কৃষি সরঞ্জামের ডেমো তালিকা
                বানিয়েছি যাতে পণ্য নির্বাচন সহজ হয়।
              </p>
              <p>
                <strong>ব্র্যান্ড নাম:</strong> {brand.nameBn} ({brand.name})
                <br />
                <strong>ট্যাগলাইন:</strong> {brand.tagline}
                <br />
                <strong>স্বত্বাধিকারী:</strong> {brand.ownerLabel}
              </p>

              <h2>লক্ষ্য ও উদ্দেশ্য</h2>
              <ul>
                <li>ফসল অনুযায়ী ও সমস্যা অনুযায়ী পণ্য খুঁজে পাওয়া সহজ করা</li>
                <li>ক্যাটাগরি, ব্র্যান্ড, দাম ও ফসল ভিত্তিক ফিল্টার দেওয়া</li>
                <li>কার্ট, উইশলিস্ট ও ডেমো চেকআউটের মাধ্যমে প্রক্রিয়াটি দেখানো</li>
                <li>কৃষি সম্পর্কিত সাধারণ জ্ঞান থেকে শুরু করে নীতিমালা পর্যন্ত তথ্য রাখা</li>
              </ul>

              <h2>গুরুত্বপূর্ণ নোট</h2>
              <Note tone="coral" icon="alert">
                এটি একটি <strong>ফ্রন্টএন্ড ডেমো ওয়েবসাইট</strong>। কোনো প্রকৃত বিক্রয়, অর্ডার গ্রহণ, পেমেন্ট
                বা ডেলিভারি হয় না। পণ্য, দাম, স্টক, ছাড়, রেটিং ও রিভিউ সবই কাল্পনিক উদাহরণ মাত্র।
              </Note>

              <Note tone="harvest" icon="shield">
                কোনো পণ্যের মাত্রা, প্রয়োগবিধি, নিরাপত্তা বিরতি, সক্রিয় উপাদান, নিবন্ধন নম্বর বা অনুমোদনের তথ্য
                এখানে প্রদান করা হয় না। যেকোনো বাস্তব ব্যবহারের আগে পণ্যের লেবেল ও অনুমোদিত উৎস অনুসরণ করুন।
              </Note>
            </article>

            <aside>
              <SectionHeading kicker="আমাদের তথ্য" title="স্বত্বাধিকারী" />
              <div className="owner-panel">
                <span className="owner-panel__ico">
                  <Icon name="user" size={28} />
                </span>
                <h3>{brand.owner}</h3>
                <p>{brand.ownerBn}</p>
                <ul>
                  <li>
                    <Icon name="phone" size={16} />
                    <a href={contactLinks.tel}>{brand.phoneDisplay}</a>
                  </li>
                  <li>
                    <Icon name="mail" size={16} />
                    <a href={contactLinks.mail}>{brand.email}</a>
                  </li>
                  <li>
                    <Icon name="location" size={16} />
                    <span>{brand.addressBn}</span>
                  </li>
                </ul>
              </div>

              <div className="panel">
                <h3>
                  <Icon name="info" size={18} /> টেকনিক্যাল তথ্য
                </h3>
                <ul>
                  <li>আর্কিটেকচার: ফ্রন্টএন্ড-অনলি (Browser side)</li>
                  <li>রাউটিং: React Router</li>
                  <li>স্টেট: React + Context (Cart, Wishlist)</li>
                  <li>ডেটা: JS/JSON লোকাল ফাইল</li>
                  <li>লোগো ও আইকন: নিজস্ব SVG</li>
                  <li>কোনো ব্যাকএন্ড, ডেটাবেস, অথেন্টিকেশন বা পেমেন্ট নেই</li>
                </ul>
              </div>

              <div className="panel panel--mint">
                <h3>
                  <Icon name="leaf" size={18} /> {brand.tagline}
                </h3>
                <p>কৃষকের আস্থাই আমাদের প্রধান বিবেচনা — এখানে সেটা শুধুমাত্র প্রদর্শনীতে প্রতিফলিত।</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
