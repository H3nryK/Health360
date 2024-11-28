import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Share, Linking } from 'react-native';
import { Text, Card, Button, Icon, Badge, Overlay } from '@rneui/themed';
import QRCode from 'react-native-qrcode-svg';
import { theme } from '../theme/theme';

const CoverageItem = ({ title, coverage, icon }) => (
  <View style={styles.coverageItem}>
    <Icon name={icon} color={theme.colors.primary} size={24} />
    <Text style={styles.coverageItemTitle}>{title}</Text>
    <Text style={styles.coverageItemValue}>{coverage}</Text>
  </View>
);

const CoverageBreakdown = () => (
  <Card containerStyle={styles.coverageBreakdownCard}>
    <Text style={styles.sectionTitle}>Coverage Details</Text>
    <View style={styles.coverageGrid}>
      <CoverageItem 
        title="Primary Care"
        coverage="$25 copay"
        icon="medical-services"
      />
      <CoverageItem 
        title="Specialist"
        coverage="$40 copay"
        icon="psychology"
      />
      <CoverageItem 
        title="Emergency"
        coverage="$250 copay"
        icon="emergency"
      />
      <CoverageItem 
        title="Hospital"
        coverage="20% after deductible"
        icon="local-hospital"
      />
    </View>
  </Card>
);

const BenefitUsage = () => (
  <Card containerStyle={styles.benefitCard}>
    <Text style={styles.sectionTitle}>Benefit Usage</Text>
    <View style={styles.benefitTracker}>
      <Text style={styles.benefitLabel}>Out-of-pocket Maximum</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '45%' }]} />
        <Text style={styles.progressText}>$2,250 / $5,000</Text>
      </View>
    </View>
    <View style={styles.benefitTracker}>
      <Text style={styles.benefitLabel}>Family Deductible</Text>
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: '30%' }]} />
        <Text style={styles.progressText}>$900 / $3,000</Text>
      </View>
    </View>
  </Card>
);

const ClaimsHistory = () => (
  <Card containerStyle={styles.claimsCard}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Recent Claims</Text>
      <Button
        title="View All"
        type="clear"
        size="sm"
      />
    </View>
    {[
      { date: '2024-01-15', type: 'Pharmacy', amount: '$45.00', status: 'Approved' },
      { date: '2024-01-10', type: 'Medical', amount: '$120.00', status: 'Processing' }
    ].map((claim, index) => (
      <View key={index} style={styles.claimItem}>
        <View>
          <Text style={styles.claimDate}>{claim.date}</Text>
          <Text style={styles.claimType}>{claim.type}</Text>
        </View>
        <View style={styles.claimRight}>
          <Text style={styles.claimAmount}>{claim.amount}</Text>
          <Badge 
            value={claim.status} 
            status={claim.status === 'Approved' ? 'success' : 'warning'}
          />
        </View>
      </View>
    ))}
  </Card>
);

const DocumentCenter = ({ onDownload }) => (
  <Card containerStyle={styles.documentCard}>
    <Text style={styles.sectionTitle}>Documents</Text>
    <TouchableOpacity style={styles.documentItem} onPress={() => onDownload('Plan Summary')}>
      <Icon name="description" color={theme.colors.primary} />
      <Text style={styles.documentName}>Plan Summary</Text>
      <Icon name="download" color={theme.colors.secondary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.documentItem} onPress={() => onDownload('Coverage Details')}>
      <Icon name="article" color={theme.colors.primary} />
      <Text style={styles.documentName}>Coverage Details</Text>
      <Icon name="download" color={theme.colors.secondary} />
    </TouchableOpacity>
  </Card>
);

const VerificationOverlay = ({ visible, onClose }) => (
  <Overlay isVisible={visible} onBackdropPress={onClose}>
    <View style={styles.overlayContainer}>
      <Text style={styles.overlayTitle}>Coverage Verification</Text>
      <Icon name="verified" size={50} color={theme.colors.success} />
      <Text style={styles.verificationText}>
        Your insurance coverage is active and verified for pharmacy benefits.
      </Text>
      <Button
        title="Close"
        onPress={onClose}
        buttonStyle={styles.closeButton}
      />
    </View>
  </Overlay>
);

const InsuranceScreen = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const shareInsuranceCard = async () => {
    try {
      await Share.share({
        message: `Insurance: BlueCross BlueShield\nMember ID: XYZ123456789\nGroup: GRP987654321`,
        title: 'Insurance Card Details'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocumentDownload = (documentName) => {
    setSelectedDocument(documentName);
    // Implement document download logic here
  };

  const handleFindPharmacy = () => {
    Linking.openURL('https://maps.google.com/maps?q=pharmacy+near+me');
  };

  return (
    <ScrollView style={styles.container}>
      <Card containerStyle={styles.insuranceCard}>
        <View style={styles.cardHeader}>
          <Icon name="shield" size={32} color={theme.colors.primary} />
          <Badge 
            value="Active" 
            status="success" 
            containerStyle={styles.statusBadge}
          />
        </View>
        
        <Text style={styles.insuranceName}>BlueCross BlueShield</Text>
        <Text style={styles.planType}>PPO Plan</Text>
        
        <View style={styles.memberInfo}>
          <Text style={styles.label}>Member ID</Text>
          <Text style={styles.value}>XYZ123456789</Text>
          <Text style={styles.label}>Group Number</Text>
          <Text style={styles.value}>GRP987654321</Text>
        </View>

        <Button
          title="Show at Pharmacy"
          icon={{ name: 'qr-code', color: 'white' }}
          buttonStyle={styles.showButton}
          onPress={() => setShowQRCode(true)}
        />
      </Card>

      <CoverageBreakdown />
      <BenefitUsage />
      <ClaimsHistory />
      <DocumentCenter onDownload={handleDocumentDownload} />

      <View style={styles.actionButtons}>
        <Button
          title="Verify Coverage"
          icon={{ name: 'verified', color: 'white' }}
          buttonStyle={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setShowVerification(true)}
        />
        <Button
          title="Find Pharmacy"
          icon={{ name: 'local-pharmacy', color: 'white' }}
          buttonStyle={[styles.actionButton, { backgroundColor: theme.colors.secondary }]}
          onPress={handleFindPharmacy}
        />
      </View>

      <Overlay isVisible={showQRCode} onBackdropPress={() => setShowQRCode(false)}>
        <View style={styles.qrContainer}>
          <QRCode
            value={`INSID:XYZ123456789:GRP987654321`}
            size={200}
          />
          <Button
            title="Share Card Details"
            onPress={shareInsuranceCard}
            buttonStyle={styles.shareButton}
            icon={{ name: 'share', color: 'white' }}
          />
        </View>
      </Overlay>

      <VerificationOverlay 
        visible={showVerification}
        onClose={() => setShowVerification(false)}
      />
    </ScrollView>
  );
};
// Merge the styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      insuranceCard: {
        borderRadius: theme.borderRadius.lg,
        padding: 20,
        marginHorizontal: 15,
        marginTop: 15,
        backgroundColor: '#fff',
        elevation: 4,
      },
      cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
      statusBadge: {
        padding: 8,
      },
      insuranceName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 5,
      },
      planType: {
        fontSize: 16,
        color: theme.colors.subtext,
        marginBottom: 20,
      },
      memberInfo: {
        backgroundColor: theme.colors.background,
        padding: 15,
        borderRadius: theme.borderRadius.md,
        marginBottom: 15,
      },
      label: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginBottom: 5,
      },
      value: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 10,
      },
      showButton: {
        borderRadius: theme.borderRadius.md,
        marginTop: 10,
      },
      coverageCard: {
        borderRadius: theme.borderRadius.md,
        marginHorizontal: 15,
        marginTop: 15,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: theme.colors.text,
      },
      tierContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      tierItem: {
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        padding: 15,
        borderRadius: theme.borderRadius.md,
        width: '30%',
      },
      tierTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: 5,
      },
      copayAmount: {
        fontSize: 16,
        fontWeight: '600',
      },
      preferredLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
      },
      pharmacyItem: {
        fontSize: 14,
        color: theme.colors.subtext,
        marginBottom: 5,
        marginLeft: 10,
      },
      deductibleCard: {
        borderRadius: theme.borderRadius.md,
        marginHorizontal: 15,
        marginTop: 15,
      },
      progressBar: {
        height: 12,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
        marginBottom: 10,
      },
      progress: {
        height: '100%',
        backgroundColor: theme.colors.primary,
      },
      deductibleInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
      },
      metAmount: {
        color: theme.colors.success,
        fontWeight: '600',
      },
      remainingAmount: {
        color: theme.colors.subtext,
        fontWeight: '600',
      },
      actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 20,
      },
      actionButton: {
        width: '48%',
        borderRadius: theme.borderRadius.md,
      },
      overlayContainer: {
        padding: 20,
        alignItems: 'center',
        minWidth: 300,
      },
      overlayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      verificationText: {
        textAlign: 'center',
        marginVertical: 20,
        color: theme.colors.subtext,
      },
      closeButton: {
        width: '100%',
        marginTop: 10,
        borderRadius: theme.borderRadius.md,
      },
  
      coverageBreakdownCard: {
          marginHorizontal: 15,
          marginTop: 15,
          borderRadius: theme.borderRadius.md,
        },
        coverageGrid: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        },
        coverageItem: {
          width: '48%',
          padding: 15,
          backgroundColor: theme.colors.background,
          borderRadius: theme.borderRadius.md,
          marginBottom: 10,
          alignItems: 'center',
        },
        benefitCard: {
          marginHorizontal: 15,
          marginTop: 15,
          borderRadius: theme.borderRadius.md,
        },
        benefitTracker: {
          marginBottom: 15,
        },
        progressContainer: {
          marginTop: 5,
          backgroundColor: theme.colors.background,
          borderRadius: theme.borderRadius.full,
          height: 20,
          overflow: 'hidden',
        },
        progressBar: {
          position: 'absolute',
          height: '100%',
          backgroundColor: theme.colors.primary,
        },
        progressText: {
          textAlign: 'center',
          lineHeight: 20,
          color: theme.colors.text,
          fontSize: 12,
          fontWeight: '600',
        },
        documentCard: {
          marginHorizontal: 15,
          marginTop: 15,
          marginBottom: 20,
          borderRadius: theme.borderRadius.md,
        },
        documentItem: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 15,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        documentName: {
          flex: 1,
          marginLeft: 15,
          fontSize: 16,
        },

        qrContainer: {
            padding: 20,
            alignItems: 'center',
          },
          shareButton: {
            marginTop: 20,
            width: 200,
          },
          claimsCard: {
            marginHorizontal: 15,
            marginTop: 15,
            borderRadius: theme.borderRadius.md,
          },
          sectionHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
          },
          claimItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          },
          claimRight: {
            alignItems: 'flex-end',
          },
          claimDate: {
            fontSize: 14,
            fontWeight: '600',
          },
          claimType: {
            fontSize: 12,
            color: theme.colors.subtext,
          },
          claimAmount: {
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 4,
          },
});

export default InsuranceScreen;