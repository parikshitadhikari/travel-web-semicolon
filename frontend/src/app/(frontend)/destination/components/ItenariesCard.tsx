"use client";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import "@mantine/core/styles.css";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";
import { useRouter } from "next/navigation";
import "@mantine/core/styles.css";

interface Label {
  id: number;
  name: string;
}

interface Place {
  id: number;
  name: string;
  description: string;
  price: number;
  guide: number;
  interested_users: string[];
  img: string;
  label: Label[];
}

interface ItenariesCardProps {
  place: Place;
}

function ItenariesCard({ place }: ItenariesCardProps) {
  const router = useRouter();
  const handleViewDetails = () => {
    router.push(`/destination/${place.id}`);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <img src={place.img} className="h-64 w-full" alt={place.name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text
          fw={500}
          style={{
            maxWidth: "50%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {place.name}
        </Text>
        <div className="max-w-[50%] flex justify-center items-center gap-x-4">
          {/* <IconHeart
            className="max-w-[40%] border-2 p-0.5 rounded-full"
            size={30}
          /> */}
          <Badge color="pink" className="max-w-[100%]">
            Rs. {place.price}
          </Badge>
        </div>
      </Group>

      <Text
        size="sm"
        c="dimmed"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {place.description}
      </Text>

      <button
        onClick={handleViewDetails}
        className="bg-green-600 hover:bg-green-700 rounded-sm w-full text-center mt-6 py-1 font-bold text-white"
      >
        View Details
      </button>
    </Card>
  );
}

export default ItenariesCard;
