/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { SyntheticEvent, useState } from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AddHoliday({ onClose }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const form = useForm<any>({
    defaultValues: {
      title: "",
      date: "",
      description: "",
      icon: "",
    },
  });

  const { data: session, status } = useSession();
  const userId = session?.user.id;

  const handleSubmit = (values: any) => {
    handleSave({
      userId: userId,
      title: values.title,
      date: values.date,
      description: values.description,
      icon: values.icon,
    });
  };

  const iconOptions = [
    { value: "mountain", label: "Mountain", icon: <MountainIcon /> },
    { value: "gift", label: "Gift", icon: <GiftIcon /> },
    { value: "party", label: "Party", icon: <PartyIcon /> },
    { value: "cake", label: "Cake", icon: <CakeIcon /> },
    { value: "beach", label: "Beach", icon: <BeachIcon /> },
    { value: "travel", label: "Travel", icon: <TravelIcon /> },
  ];

  const handleSave = async (data: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOLIDAY_API}/add-holiday`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onClose();
        router.refresh();

        ref.current?.click();
        toast({
          variant: "success",
          title: "Success",
          description: "Holiday saved with success",
        });
      } else {
        console.error("Erro ao salvar feriado");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save holiday",
        });
      }
    } catch (error) {
      console.error("Erro ao fazer fetch:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card>
        <CardHeader className="relative">
          <h2 className="text-lg font-semibold">Add Holiday</h2>
          <Button className="absolute top-2 right-2" onClick={onClose}>
            X
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Title" required={true} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Date</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Date"
                                type="date"
                                required={true}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Icon</FormLabel>
                            <Select onValueChange={field.onChange} required={true}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a icon" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {iconOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span>{option.label}</span>
                                      <span className="fixed ml-[70px] w-[180px]">
                                        {option.icon}
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[100px]"
                              id="description"
                              placeholder="Enter description"
                              required={true}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function CakeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M160-80q-17 0-28.5-11.5T120-120v-200q0-33 23.5-56.5T200-400v-160q0-33 23.5-56.5T280-640h160v-58q-18-12-29-29t-11-41q0-15 6-29.5t18-26.5l56-56 56 56q12 12 18 26.5t6 29.5q0 24-11 41t-29 29v58h160q33 0 56.5 23.5T760-560v160q33 0 56.5 23.5T840-320v200q0 17-11.5 28.5T800-80H160Zm120-320h400v-160H280v160Zm-80 240h560v-160H200v160Zm80-240h400-400Zm-80 240h560-560Zm560-240H200h560Z" />
    </svg>
  );
}

function PartyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="m80-80 200-560 360 360L80-80Zm132-132 282-100-182-182-100 282Zm370-246-42-42 224-224q32-32 77-32t77 32l24 24-42 42-24-24q-14-14-35-14t-35 14L582-458ZM422-618l-42-42 24-24q14-14 14-34t-14-34l-26-26 42-42 26 26q32 32 32 76t-32 76l-24 24Zm80 80-42-42 144-144q14-14 14-35t-14-35l-64-64 42-42 64 64q32 32 32 77t-32 77L502-538Zm160 160-42-42 64-64q32-32 77-32t77 32l64 64-42 42-64-64q-14-14-35-14t-35 14l-64 64ZM212-212Z" />
    </svg>
  );
}

function GiftIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M160-80v-440H80v-240h208q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q23 0 43 8.5t37 23.5q17-16 37-24t43-8q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h208v240h-80v440H160Zm400-760q-17 0-28.5 11.5T520-800q0 17 11.5 28.5T560-760q17 0 28.5-11.5T600-800q0-17-11.5-28.5T560-840Zm-200 40q0 17 11.5 28.5T400-760q17 0 28.5-11.5T440-800q0-17-11.5-28.5T400-840q-17 0-28.5 11.5T360-800ZM160-680v80h280v-80H160Zm280 520v-360H240v360h200Zm80 0h200v-360H520v360Zm280-440v-80H520v80h280Z" />
    </svg>
  );
}

function BeachIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M80-40v-80h40q32 0 62-10t58-30q28 20 58 29.5t62 9.5q32 0 62.5-9.5T480-160q28 20 58 29.5t62 9.5q32 0 62.5-9.5T720-160q27 20 57.5 30t62.5 10h40v80h-40q-31 0-61-7.5T720-70q-29 15-59 22.5T600-40q-31 0-61-7.5T480-70q-29 15-59 22.5T360-40q-31 0-61-7.5T240-70q-29 15-59 22.5T120-40H80Zm260-760 222 41q14 2 27 11t22 25l35 62q26 45 72 73t102 28v80q-78 0-142-39T577-621l-90 61 153 120v154q16 11 31 23t29 23q-21 18-46 29t-54 11q-36 0-67-17t-53-43q-22 26-53 43t-67 17q-10 0-19.5-1.5T322-206q-86-59-144-119t-58-104q0-31 24-41t50-10q29 0 67 8.5t81 24.5l-21-124q-4-20 4.5-39.5T352-642l86-58q-3 0-14.5-2.5t-25.5-5-25.5-5Q361-715 358-715l-113 77-45-66 140-96Zm72 284 18 106q27 13 67 34.5t63 35.5v-60L412-516Zm268-224q-33 0-56.5-23.5T600-820q0-33 23.5-56.5T680-900q33 0 56.5 23.5T760-820q0 33-23.5 56.5T680-740Z" />
    </svg>
  );
}

function TravelIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="m274-274-128-70 42-42 100 14 156-156-312-170 56-56 382 98 157-155q17-17 42.5-17t42.5 17q17 17 17 42.5T812-726L656-570l98 382-56 56-170-312-156 156 14 100-42 42-70-128Z" />
    </svg>
  );
}
