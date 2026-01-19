"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useGetPropertyService } from "@/services/api/services/properties";
import { PropertyDetails } from "@/services/api/types/property";
import HTTP_CODES_ENUM from "@/services/api/types/http-codes";
import { FullPageLoader } from "@/components/full-page-loader";
import { useTranslation } from "@/services/i18n/client";

function PropertyDetailsPage() {
  const params = useParams<{ id: string }>();
  const propertyId = params.id;
  const getPropertyService = useGetPropertyService();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation("property-details");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const { status, data } = await getPropertyService({ id: propertyId });
        if (status === HTTP_CODES_ENUM.OK) {
          setProperty(data);
        }
      } catch (error) {
        console.error("Failed to fetch property", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, getPropertyService]);

  if (isLoading) {
    return <FullPageLoader isLoading={isLoading} />;
  }

  if (!property) {
    return (
      <Container>
        <Typography variant="h4" pt={3}>
          {t("errors.not-found")}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box pt={3}>
        <Typography variant="h3" gutterBottom>
          {property.title}
        </Typography>

        <Typography variant="h5" gutterBottom mt={4}>
          {t("sections.photos")}
        </Typography>
        <Grid container spacing={2} mb={3}>
          {property.photos?.map((photo) => (
            <Grid key={photo.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component="img"
                src={photo.path}
                alt={property.title}
                sx={{ width: "100%", height: "auto", borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom mt={4}>
          {t("sections.videos")}
        </Typography>
        <Grid container spacing={2} mb={3}>
          {property.videos?.map((video) => (
            <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Box
                component="video"
                src={video.path}
                controls
                sx={{ width: "100%", height: "auto", borderRadius: 1 }}
              />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h5" gutterBottom mt={4}>
          {t("sections.tags")}
        </Typography>
        <Box mb={3}>
          {property.tags?.map((tag) => (
            <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>

        {property.description && (
          <>
            <Typography variant="h5" gutterBottom mt={4}>
              {t("sections.description")}
            </Typography>
            <Typography variant="body1">{property.description}</Typography>
          </>
        )}
      </Box>
    </Container>
  );
}

export default PropertyDetailsPage;
