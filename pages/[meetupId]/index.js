import { Fragment } from "react";
import Head from "next/head";
import { connectToDatabase } from "../../helpers/db-util";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { ObjectId } from "mongodb";
function MeetupDetails(props) {
  const { image, title, address, description } = props.meetupData;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await connectToDatabase();

  const db = client.db();
  const selectedMeetup = await db
    .collection("meetups")
    .findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase();

  const db = client.db();
  const meetups = await db.collection("meetups").find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
    fallback: false,
  };
}

export default MeetupDetails;
