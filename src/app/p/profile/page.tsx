import ProfileAddressInfoView from "@/components/core/profile/ProfileAddressInfoView";
import ProfileHeaderInfoView from "@/components/core/profile/ProfileHeaderInfoView";
import ProfilePersonalInfoView from "@/components/core/profile/ProfilePersonalInfoView";
import PageHeader from "@/components/shared/PageHeader";
import PageWrapper from "@/components/shared/PageWrapper";
const AdminProfilePage = () => {
  return (
    <>
      <PageWrapper>
        <PageHeader title="Profile" />
        <section className="space-y-4">
          <ProfileHeaderInfoView />
          <ProfilePersonalInfoView />
          <ProfileAddressInfoView />
        </section>
      </PageWrapper>
    </>
  );
};

export default AdminProfilePage;
